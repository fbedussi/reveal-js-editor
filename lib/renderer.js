const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const clipboard = remote.clipboard;
const shell = electron.shell;

const mainProcess = remote.require('./main');

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()
    .use(require('markdown-it-container'), 'slide', {
        render: function (tokens, idx) {
            //var m = tokens[idx].info.trim().match(/^slide\s+(.*)$/);

            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<section>\n';
            } else {
                // closing tag
                return '</section>\n';
            }
        }
    })
    .use(require('markdown-it-classy'));

const markdownViewEl = document.querySelector('.raw-markdown');
const htmlViewEl = document.querySelector('.rendered-html');
const previewEl = document.querySelector('.preview .slides');
const openFileButtonEl = document.querySelector('#open-file');
const saveFileButtonEl = document.querySelector('#save-file');
const saveMdButtonEl = document.querySelector('#save-md');
const copyHtmlButtonEl = document.querySelector('#copy-html');
const showInFileSystemButtonEl = document.querySelector('#show-in-file-system');
const openInDefaultEditorButtonEl = document.querySelector('#open-in-default-editor');

var currentFile = null
var previewOn = false;


function insertAtCursor(myValue) {
    var myField = document.querySelector('.raw-markdown');
    if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

function initReveal(options) {
    // More info https://github.com/hakimel/reveal.js#configuration
    if (!Reveal.isReady()) {
        Reveal.initialize({
            controls: true,
            progress: true,
            history: true,
            center: true,

            transition: options.transition,

            // More info https://github.com/hakimel/reveal.js#dependencies
            dependencies: [{
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
            }]
        });
    } else {
        Reveal.configure(options);
    }

    Reveal.slide(0);
}

function updateThemeCss(theme) {
    document.getElementById('themeCss').href = `../node_modules/reveal.js/css/theme/${theme}.css`;
}

function addRevealCss(options) {
    var revealCss = document.createElement('link');
    var themeCss = document.createElement('link');
    var zenBurnCss = document.createElement('link');
    var printCss = document.createElement('link');
    revealCss.rel = themeCss.rel = zenBurnCss.rel = printCss.rel = 'stylesheet';
    revealCss.type = themeCss.type = zenBurnCss.type = printCss.type = 'text/css';
    revealCss.href = '../node_modules/reveal.js/css/reveal.css';
    revealCss.id = 'revealCss';
    themeCss.id = 'themeCss';
    zenBurnCss.href = '../node_modules/reveal.js/lib/css/zenburn.css';
    zenBurnCss.id = 'zenBurnCss';
    printCss.href = window.location.search.match(/print-pdf/gi) ? '../node_modules/reveal.js/css/print/pdf.css' : '../node_modules/reveal.js/css/print/paper.css';
    printCss.id = 'printCss';

    document.head.appendChild(revealCss);
    document.head.appendChild(themeCss);
    document.head.appendChild(zenBurnCss);
    document.head.appendChild(printCss);
    updateThemeCss(options.theme);
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
        insertAtCursor(`:::${content}\n:::\n`);
    })
    .on('togglePreview', (event, showPreview, options) => {
        if (showPreview) {
            previewOn = true;
            document.body.classList.add('previewOn');
            initReveal(options);
            addRevealCss(options);
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
    .on('transitionEffectChange', (event, transition) => {
        if (previewOn) {
            Reveal.configure({
                transition
            })
        }
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