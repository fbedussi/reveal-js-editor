//Generic imports
const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const clipboard = remote.clipboard;
const shell = electron.shell;

require('./spellCheckerInit');
const md = require('./mdConverter');

const mainProcess = remote.require('./main');

//Caching elements
const markdownViewEl = document.querySelector('.raw-markdown');
const htmlViewEl = document.querySelector('.rendered-html');
const previewEl = document.querySelector('.preview .slides');
const openFileButtonEl = document.querySelector('#openFile');
const saveProjectButtonEl = document.querySelector('#savePresentation');
const insertSlideButtonEl = document.querySelector('#insertSlide');
const insertImageButtonEl = document.querySelector('#insertImage');
const previewWinButtonEl = document.querySelector('#previewWin');

//Variables
var themeCssEl;
var previewOn = false;
var exportMedia = true;

//Buttons listeners
openFileButtonEl.addEventListener('click', () => {
    mainProcess.openFile();
});
saveProjectButtonEl.addEventListener('click', () => {
    remote.getCurrentWindow().webContents.send('saveProject');
});
insertSlideButtonEl.addEventListener('click', () => {
    insert('::::slide\n\n::::');
});
insertImageButtonEl.addEventListener('click', () => {
    mainProcess.openImg(remote.getCurrentWindow());
});
previewWinButtonEl.addEventListener('click', () => {
    remote.getCurrentWindow().webContents.send('openPreview');
});

function getCurrentEditLine() {
    var caretPos = markdownViewEl.selectionStart;
    var start;
    var end;

    for (start = caretPos - 1; start >= 0 && markdownViewEl.value[start - 1] != "\n"; --start);
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
        newLine = line.text + pad(value, line.text, line.text.length - 1, line.text.length - 1);
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
        let finalPosition;

        if (pattern) {
            let line = replace(trimValue, pattern);
            start = line.start;
            end = line.end;
            valueToInsert = line.text;
        } else {
            start = markdownViewEl.selectionStart;
            end = markdownViewEl.selectionEnd;
            valueToInsert = value.match(/:::slide/)? value : pad(value, markdownViewEl.value, start - 1, end);
        }

        markdownViewEl.value = markdownViewEl.value.substring(0, start) + valueToInsert + markdownViewEl.value.substring(end, markdownViewEl.value.length);
        
        finalPosition = Boolean(valueToInsert.match(/::::?slide/))? start + valueToInsert.match(/::::?slide[^\n]*(\n|$)/)[0].length : start + valueToInsert.length;
        markdownViewEl.selectionStart = markdownViewEl.selectionEnd = finalPosition;
    } else {
        markdownViewEl.value += value;
    }
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
                hljs.initHighlighting();
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
    themeCssEl.href = theme !== 'none' ? `../../node_modules/reveal.js/css/theme/${theme}.css` : '';
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

function getMediaFiles(text) {
  var fileMatches = text.match(/(?:background-(?:image|video)="([^"]+)")|(?:!\[[^\]]*\] ?\(([^")]+\w)[^)]*\))/g);
  
  if (!fileMatches) {
    return [];
  }
  
  return
    fileMatches
      .map(match => match.replace(/background-(?:image|video)="([^"]+)"/, '$1'))
      .map(match => match.replace(/!\[[^\]]*\] ?\(([^")]+\w)[^)]*\)/, '$1'))
    ;
}

function updateMediaPath(html) {
    return html
        .replace(/(background-(?:image|video)=")(?:[^"]*[\\/])?([\w% ]+\.\w+")/g, '$1media/$2')
        .replace(/(src=")(?:.*[\\/])?([\w% ]+\.\w+)/g, '$1media/$2');
}

function saveHTML() {
    const html = htmlViewEl.innerHTML;

    mainProcess.saveProject(html);    
}

function saveMD() {
    const md = markdownViewEl.value;

    mainProcess.saveMd(md);
}

//Main process listeners
ipc
    .on('fileOpened', (event, file, content) => {
        mainProcess.updateMenu();

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
            addRevealCss(theme);
            //wait for css loading
            setTimeout(() => {
                initReveal(configuration);
            },100)
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
    .on('updateMenu', () => {
        mainProcess.updateMenu();
    })
    .on('unShuffle', (event, configuration) => {
        previewEl.innerHTML = '';
        renderMarkdownToHtml(markdownViewEl.value);
        initReveal(configuration);
    })
    .on('imgPath', (event, imgPath) => {
        insert(`![](${imgPath.replace(/ /g,'%20')})`, /!\[[^\]]*\]\([^)]+\)/);
    })
    .on('saveProject', () => {
        let html = htmlViewEl.innerHTML;
        let md = markdownViewEl.value;
        let mediaFiles = [];

        if (exportMedia) {
            mediaFiles = getMediaFiles(markdownViewEl.value);
            html = updateMediaPath(html);
            md = updateMediaPath(md);
        }

        mainProcess.saveProject(html, md, true, mediaFiles);
    })
    .on('saveMD', saveMD)
    .on('saveHTML', saveHTML)
    .on('copyHTML', () => clipboard.writeText(htmlViewEl.innerHTML))
    .on('getCurrentSlideBackgrounSettings', () => {
        var currentLine = getCurrentEditLine()
            .text
        var currentSettings;
        if (currentLine.match(/^:+slide/)) {
            let currentSlideAttr = currentLine
                .replace(/^:+slide */, '')
                .trim()
                .replace(/" /g, '"!')
                .split('!')
                .filter(item => item.match(/^background-[^=]+="[^"]+"/));

            if (currentSlideAttr.length) {
                currentSettings = currentSlideAttr
                    .map(item => {
                        let itemBits = item.split('=');

                        return {
                            key: itemBits[0],
                            value: itemBits[1].replace(/"/g, '')
                        };
                    });
            }
        }
        mainProcess.openBgWin(currentSettings);
    });

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

//Prevent the opening of speakers note
document.body.addEventListener('keydown', (e) => {
    if (e.key === 's') {
        e.stopPropagation();
    }
});