const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const clipboard = remote.clipboard;
const shell = electron.shell;

const webFrame = electron.webFrame;
const spellChecker = require('spellchecker');

webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()
    .use(require('markdown-it-container'), 'slide', {
        render: function (tokens, idx) {           
            var attributes = tokens[idx].info
                .trim()
                .replace(/slide +/, '')
                .replace(/" /g,'"!')
                .split('!')
                .map(attr => 
                    'data-'
                    + attr.replace('class="', 'state="') 
                    .replace(/(background-(?:image|video)=")([^"]+")/, (match, p1, p2) => p1+p2.replace(/ /g, '%20')) //replace spaces in file name with %20
                )
                .join(' ')
            ;

            if (tokens[idx].nesting === 1) {
                return `<section ${attributes}>\n`;
            } else {
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

var exportMedia = true;

//CACHING ELEMENTS
var markdownViewEl = document.querySelector('.raw-markdown');
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

function getCurrentEditLine() {
    var caretPos = markdownViewEl.selectionStart;
    var start;
    var end;

    for (start = caretPos - 1; start >= 0 && markdownViewEl.value[start-1] != "\n"; --start);
    for (end = caretPos; end < markdownViewEl.value.length && markdownViewEl.value[end] != "\n"; ++end);
    
    return {
        start,
        end,
        text: markdownViewEl.value.substring(start, end)
    };
}

function pad(value, sorroundingText, start, end) {
    var padValue = value;
    
    if (sorroundingText[end] !== ' ') {
        padValue = padValue + ' ';
    }
    if (sorroundingText[start] !== ' ') {
        padValue = ' ' + padValue;
    }
    
    return padValue;
}

function replace(value, pattern) {
    var line = getCurrentEditLine();
    var re = new RegExp(pattern);
    var newLine;
    
    if (line.text.match(re)) {
        newLine = line.text.replace(re, value);
    } else {
        newLine = line.text + pad(value, line.text, line.text.length-1, line.text.length-1);
    }
    
    return {
        start: line.start,
        end: line.end,
        text: newLine
    }
}

function insertReplaceAtCursor(value, pattern) {
    if (markdownViewEl.selectionStart || markdownViewEl.selectionStart == '0') {
        let start;
        let end;
        let valueToInsert;
        let trimValue = value.trim();

        if (pattern) {
            let line = replace(trimValue, pattern);
            start = line.start;
            end = line.end;
            valueToInsert = line.text;
        } else {
            start = markdownViewEl.selectionStart;
            end = markdownViewEl.selectionEnd;
            valueToInsert = pad(value, markdownViewEl.value, start-1, end);
        }
        
        markdownViewEl.value = markdownViewEl.value.substring(0, start) + valueToInsert + markdownViewEl.value.substring(end, markdownViewEl.value.length);
        markdownViewEl.selectionStart = markdownViewEl.selectionEnd = start + valueToInsert.length; 
    } else {
        markdownViewEl.value += value;
    }
}

function initReveal(configuration) {
    if (!Reveal.isReady()) {        
        configuration.dependencies = [{
                src: '../../node_modules/reveal.js/lib/js/classList.js',
                condition: function () {
                    return !document.body.classList;
                }
            }, {
                src: '../../node_modules/reveal.js/plugin/highlight/highlight.js',
                async: true,
                callback: function () {
                    hljs.initHighlightingOnLoad();
                }
            }, {
                src: '../../node_modules/reveal.js/plugin/zoom-js/zoom.js',
                async: true
            }, {
                src: '../../node_modules/reveal.js/plugin/notes/notes.js',
                async: true
            }];
        
        Reveal.initialize(configuration);
    } else {
        Reveal.configure(configuration);
    }

    Reveal.slide(0);
}

function updateThemeCss(theme) {
    themeCssEl.href = theme !== 'none'? `../../node_modules/reveal.js/css/theme/${theme}.css`: '';
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
    createCssLink('revealCss', '../../node_modules/reveal.js/css/reveal.css');
    themeCssEl = createCssLink('themeCss');
    createCssLink('zenBurnCss', '../../node_modules/reveal.js/lib/css/zenburn.css');
    createCssLink('printCss', window.location.search.match(/print-pdf/gi) ? '../../node_modules/reveal.js/css/print/pdf.css' : '../../node_modules/reveal.js/css/print/paper.css');

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

function insert(content, pattern) {
    insertReplaceAtCursor(content, pattern);
    renderMarkdownToHtml(markdownViewEl.value);
}

function getMediaFiles(text) {
    return text.value
        .match(/(?:background-(?:image|video)="([^"]+)")|(?:!\[[^\]]*\] ?\(([^")]+\w)[^)]*\))/g)
        .map(match => match.replace(/background-(?:image|video)="([^"]+)"/,'$1'))
        .map(match => match.replace(/!\[[^\]]*\] ?\(([^")]+\w)[^)]*\)/, '$1'))
    ;
}

function updateMediaPath(html) {
    return html
        .replace(/(background-(?:image|video)=")(?:[^"]*[\\/])?([\w%]+\.\w+")/g, '$1media/$2')
        .replace(/(src=")(?:.*[\\/])?([\w%]+\.\w+)/g, '$1media/$2')
    ;
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
    .on('insert', (event, content, pattern) => {
        insert(content, pattern);
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
        let html = htmlViewEl.innerHTML;
        let mediaFiles = [];
        
        if (exportMedia) {
            mediaFiles = getMediaFiles(markdownViewEl);
            html = updateMediaPath(html);
        }
    
        mainProcess.saveFile(html, true, mediaFiles);
    })
    .on('getCurrentSlideBackgrounSettings', () => {
        var currentLine = getCurrentEditLine().text
        var currentSettings;
        if (currentLine.match(/^:+slide/)) {
            let currentSlideAttr = currentLine
                .replace(/^:+slide */, '')
                .trim()
                .replace(/" /g, '"!')
                .split('!')
                .filter(item => item.match(/^background-[^=]+="[^"]+"/))
            ;
            
            if (currentSlideAttr.length) {
                currentSettings = currentSlideAttr
                    .map(item => {
                        let itemBits = item.split('=');
                        
                        return {
                            key: itemBits[0],
                            value: itemBits[1].replace(/"/g, '')
                        };
                    })
                ;
            }
        }
        mainProcess.openBgWin(currentSettings);
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
    insert(`background-color="${slideColorInputEl.value}"`, 'background-color="[^"]*"');    
});

//Prevent the opening of speakers note
document.body.addEventListener('keydown', (e)=>{
    console.log(e);
    if (e.key === 's') {
        e.stopPropagation();
    }
});