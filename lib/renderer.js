const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const clipboard = remote.clipboard;
const shell = electron.shell;

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()
    .use(require('markdown-it-container'), 'slide', {
        render: function (tokens, idx) {
            var slideTransition = '';
            var slideClass = '';
            var slideBgColor = '';
            
            var transition = tokens[idx].info.trim().match(/^slide(?:.*)(transition="[^"]+")/);
            var className = tokens[idx].info.trim().match(/^slide(?:.*)(class="([^"]*)")/);
            var bgColor = tokens[idx].info.trim().match(/^slide(?:.*)(background-color="[^"]*")/);
            
            if (transition) {
                slideTransition = ' data-' + transition[1];
            }
            
            if (className) {
                slideClass = ` data-state="${className[2]}"`;
            }
            
            if (bgColor) {
                slideBgColor = ` data-${bgColor[1]}`;
            }

            if (tokens[idx].nesting === 1) {
                // opening tag
                return `<section${slideTransition}${slideClass}${slideBgColor}>\n`;
            } else {
                // closing tag
                return '</section>\n';
            }
        }
    })
    .use(require('markdown-it-container'), 'speakerNote', {
        render: function (tokens, idx) {
            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<aside class="notes">\n';
            } else {
                // closing tag
                return '</aside>\n';
            }
        }
    })
    .use(require('markdown-it-classy'))
;

const mainProcess = remote.require('./main');


//CACHING ELEMENTS
const markdownViewEl = document.querySelector('.raw-markdown');
const htmlViewEl = document.querySelector('.rendered-html');
const previewEl = document.querySelector('.preview .slides');
const openFileButtonEl = document.querySelector('#open-file');
const saveFileButtonEl = document.querySelector('#save-file');
const saveMdButtonEl = document.querySelector('#save-md');
const copyHtmlButtonEl = document.querySelector('#copy-html');
const showInFileSystemButtonEl = document.querySelector('#show-in-file-system');
const openInDefaultEditorButtonEl = document.querySelector('#open-in-default-editor');
const slideColorInputEl = document.querySelector('#slide-color');
const slideColorButtonEl = document.querySelector('#slide-color-apply');
var themeCssEl;

var currentFile = null
var previewOn = false;

function insertAtCursor(value) {
    if (markdownViewEl.selectionStart || markdownViewEl.selectionStart == '0') {
        var startPos = markdownViewEl.selectionStart;
        var endPos = markdownViewEl.selectionEnd;
        markdownViewEl.value = markdownViewEl.value.substring(0, startPos) + value + markdownViewEl.value.substring(endPos, markdownViewEl.value.length);
    } else {
        markdownViewEl.value += value;
    }
}

function clear(value) {
    //Remove the value eventually present on the current line
}

function initReveal(configuration) {
    if (!Reveal.isReady()) {        
        configuration.dependencies = [{
                src: '../node_modules/reveal.js/lib/js/classList.js',
                condition: function () {
                    return !document.body.classList;
                }
            }, {
                src: '../node_modules/reveal.js/plugin/highlight/highlight.js',
                async: true,
                callback: function () {
                    hljs.initHighlightingOnLoad();
                }
            }, {
                src: '../node_modules/reveal.js/plugin/zoom-js/zoom.js',
                async: true
            }, {
                src: '../node_modules/reveal.js/plugin/notes/notes.js',
                async: true
            }];
        
        Reveal.initialize(configuration);
    } else {
        Reveal.configure(configuration);
    }

    Reveal.slide(0);
}

function updateThemeCss(theme) {
    themeCssEl.href = theme !== 'none'? `../node_modules/reveal.js/css/theme/${theme}.css`: '';
}

function createCssLink(id, href) {
    var link = document.createElement('link');
    
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.id = id;
    if (href) {
        link.href = href;    
    }
    
    document.head.appendChild(link);
    
    return link;
}

function addRevealCss(theme) {
    createCssLink('revealCss', '../node_modules/reveal.js/css/reveal.css');
    themeCssEl = createCssLink('themeCss');
    createCssLink('zenBurnCss', '../node_modules/reveal.js/lib/css/zenburn.css');
    createCssLink('printCss', window.location.search.match(/print-pdf/gi) ? '../node_modules/reveal.js/css/print/pdf.css' : '../node_modules/reveal.js/css/print/paper.css');

    updateThemeCss(theme);
}

function removeRevealCss() {
    var revealCss = document.getElementById('revealCss');
    var themeCss = document.getElementById('themeCss');
    var zenBurnCss = document.getElementById('zenBurnCss');
    var printCss = document.getElementById('printCss');

    document.head.removeChild(revealCss);
    document.head.removeChild(themeCss);
    document.head.removeChild(zenBurnCss);
    document.head.removeChild(printCss);
}

function renderMarkdownToHtml(markdown) {
    const html = md.render(markdown);
    
    htmlViewEl.innerHTML = html;
    previewEl.innerHTML = html;
}

function insert(content) {
    insertAtCursor(content);
    renderMarkdownToHtml(markdownViewEl.value);
}

//Main process listeners
ipc
    .on('fileOpened', (event, file, content) => {
        currentFile = file

        showInFileSystemButtonEl.disabled = false;
        openInDefaultEditorButtonEl.disabled = false;

        markdownViewEl.value = content;
        renderMarkdownToHtml(content)
    })
    .on('insert', (event, content) => {
        insert(content);
    })
    .on('openPreview', (event) => {
        mainProcess.openPreview(htmlViewEl.innerHTML);
    })
    .on('togglePreview', (event, showPreview, configuration, theme) => {
        if (showPreview) {
            previewOn = true;
            document.body.classList.add('previewOn');
            initReveal(configuration);
            addRevealCss(theme);
        } else {
            previewOn = false;
            document.body.classList.remove('previewOn');
            removeRevealCss();
        }
    })
    .on('themeChange', (event, theme) => {
        if (previewOn) {
            updateThemeCss(theme);
        }
    })
    .on('configurationChange', (event, configuration) => {
        Reveal.configure(configuration);
    })
    .on('exportProject', () => {
        const html = htmlViewEl.innerHTML;
    
        mainProcess.saveFile(html, true);
    })
;

//Misc listeners
markdownViewEl.addEventListener('keyup', (event) => {
    const content = event.target.value;
    
    renderMarkdownToHtml(content);
});

document.addEventListener('click', (event) => {
        if (event.target.tag === 'a' && event.target.href.match(/^http/)) {
                event.preventDefault();
                shell.openExternal(event.target.href);
        }
});

//Buttons listeners
openFileButtonEl.addEventListener('click', ()=>{
        mainProcess.openFile();
});

copyHtmlButtonEl.addEventListener('click', () => {
    const html = htmlViewEl.innerHTML;
    
    clipboard.writeText(html);
})

saveFileButtonEl.addEventListener('click', () => {
    const html = htmlViewEl.innerHTML;
    
    mainProcess.saveFile(html);
});

saveMdButtonEl.addEventListener('click', () => {
    const md = markdownViewEl.value;
    
    mainProcess.saveMd(md);
});

showInFileSystemButtonEl.addEventListener('click', () => {
    shell.showItemInFolder(currentFile);
});

openInDefaultEditorButtonEl.addEventListener('click', () => {
    shell.openItem(currentFile);
});

slideColorButtonEl.addEventListener('click', () => {
    clear(/background-color=".+"/);
    insert(`background-color="${slideColorInputEl.value}"`);    
});

//Prevent the opening of speakers note
document.body.addEventListener('keydown', (e)=>{
    console.log(e);
    if (e.key === 's') {
        e.stopPropagation();
    }
});