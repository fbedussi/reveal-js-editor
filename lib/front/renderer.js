//Generic imports
const {ipcRenderer, remote, clipboard, shell} = require('electron');

require('./spellCheckerInit');

const mainProcess = remote.require('./main');
const _ = mainProcess.getText;
const {createComponent, ui} = require('./ui');

//Init UI
const editor = require('./editor.js');

createComponent().getEl('.mdTab').setText(() => _('Markdown editor'));
createComponent().getEl('.htmlTab').setText(() => _('Html output'));

//Buttons
const openFileButtonEl = createComponent().getEl('#openFile').setText(() => _('Open markdown file')).on('click', () => {
    mainProcess.openFile();
});
const saveProjectButtonEl = createComponent().getEl('#savePresentation').setText(() => _('Save presentation')).on('click', () => {
    remote.getCurrentWindow().webContents.send('saveProject');
});
const insertSlideButtonEl = createComponent().getEl('#insertSlide').setText(() => _('Insert slide')).on('click', () => {
    editor.insert('::::slide\n\n::::');    
});
const insertImageButtonEl = createComponent().getEl('#insertImage').setText(() => _('Insert image')).on('click', () => {
    mainProcess.openImg(remote.getCurrentWindow());
});
const previewWinButtonEl = createComponent().getEl('#previewWin').setText(() => _('Open preview in a new window')).on('click', () => {
    remote.getCurrentWindow().webContents.send('openPreview');
});

//Variables
var themeCssEl;
var previewOn = false;
var exportMedia = true;

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
      .map(match => match.replace(/^background-(?:image|video)="([^"]+)"/, '$1'))
      .map(match => match.replace(/!\[[^\]]*\] ?\(([^")]+\w)[^)]*\)/, '$1'))
    ;
}

function updateMediaPath(html) {
    return html
        .replace(/(background-(?:image|video)=")(?:[^"]*[\\/])?([\w% ]+\.\w+")/g, '$1media/$2')
        .replace(/(src=")(?:.*[\\/])?([\w% ]+\.\w+)/g, '$1media/$2');
}

//Main process listeners
ipcRenderer
    .on('fileOpened', (event, file, content) => {
        mainProcess.updateMenu();
        editor.setMdContent(content);
        document.title = 'REMEDI - ' + file;
    })
    .on('insert', (event, content, pattern) => {
        editor.insert(content, pattern);
    })
    .on('languageChanged', () => {
        ui.refreshAllTexts();
    })
    .on('openPreview', (event) => {
        mainProcess.openPreview(editor.getHtml());
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
        editor
            .resetPreview()
            .renderMd()
        ;
        
        initReveal(configuration);
    })
    .on('imgPath', (event, imgPath) => {
        editor.insert(`![](${imgPath.replace(/ /g,'%20')})`, /!\[[^\]]*\]\([^)]+\)/);
    })
    .on('saveProject', () => {
        let html = editor.getHtml();
        let md = editor.getMd();
        let mediaFiles = [];

        if (exportMedia) {
            mediaFiles = getMediaFiles(md);
            html = updateMediaPath(html);
            md = updateMediaPath(md);
        }

        mainProcess.saveProject(html, md, true, mediaFiles);
    })
    .on('saveMD', () => {mainProcess.saveMd(editor.getMd());})
    .on('saveHTML', () => {mainProcess.saveProject(editor.getHtml());})
    .on('copyHTML', () => clipboard.writeText(editor.getHtml()))
    .on('getCurrentSlideBackgrounSettings', () => {
        var currentLine = editor.getCurrentEditLine().text;
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
                    });
            }
        }
        
        mainProcess.openBgWin(currentSettings);
    })
    .on('uiConfigurationChanged', (event, uiConfiguration) => {
        document.querySelector('#colorSchemeLink').href = `skins/${uiConfiguration.colorScheme}.css`
    })
;

//Open links in new window
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