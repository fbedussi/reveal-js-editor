//Electron inport
//const {ipcRenderer, remote, clipboard, shell} = require('electron');
//import {ipcRenderer, remote, clipboard, shell} from 'electron';

//import './spellCheckerInit';
//import editor from './editor.js';

//const mainProcess = remote.require('./main');
//const _ = mainProcess.getText;

//const {createComponent, ui} = require('./ui');

//const React = require('react');
//const ReactDOM = require('react-dom');
//const {createStore, combineReducers} = require('redux');
//const {Provider} = require('react-redux');
//const reducers = require('./reducers');

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
//import reducers from './reducers';


//const store = createStore(combineReducers(reducers));

function run() {
   //let state = store.getState();
   
   ReactDOM.render(
                  <Provider>
                  <div>
                        <section className="editor">
                            <section className="controls">
                                <button id="openFile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" className="icon icon--openFile">
                                        <path d="M41.998 17.676c.817-.715 1.884-1.108 3.004-1.108 1.118 0 2.186.394 3.003 1.108l17.39 15.22c.48.422.77 1.007.813 1.646.042.64-.167 1.255-.59 1.737-.836.953-2.423 1.06-3.38.222l-14.84-12.988V58.9c0 1.32-1.075 2.396-2.396 2.396-1.32 0-2.396-1.074-2.396-2.396V23.514l-14.844 12.99c-.96.837-2.542.73-3.382-.228-.87-.994-.768-2.51.226-3.38l17.392-15.22zM74.832 68.64H15.168c-1.322 0-2.397 1.074-2.397 2.397 0 1.32 1.078 2.396 2.4 2.396h59.664c1.322 0 2.396-1.074 2.396-2.396 0-1.323-1.075-2.396-2.397-2.396z"/>					
                                    </svg>
                                    <span className="button-text text">Open markdown file</span>
                                </button>
                                
                            </section>

                            <section className="content">
                                <div className="mdContainer">
                                    <div className="tabContainer">
                                        <div className="tab mdTab text">Markdown editor</div>
                                    </div>
                                    <textarea className="raw-markdown"></textarea>	
                                </div>
                                <div className="htmlContainer">
                                    <div className="tabContainer">
                                        <div className="tab htmlTab text">Html output</div>
                                    </div>
                                    <div className="rendered-html"></div>
                                </div>
                            </section>
                        </section>
                        <section className="preview">
                            <div className="reveal">
                                <div className="slides">
                    
                                </div>
                            </div>
                        </section>
                     </div>
                  </Provider>, document.getElementById('app'));
}

run();

//store.subscribe(run);

//Init UI

//createComponent().getEl('.mdTab').setText(() => _('Markdown editor'));
//createComponent().getEl('.htmlTab').setText(() => _('Html output'));

//Buttons
//const openFileButtonEl = createComponent().getEl('#openFile').setText(() => _('Open markdown file')).on('click', () => {
//    mainProcess.openFile();
//});
//const saveProjectButtonEl = createComponent().getEl('#savePresentation').setText(() => _('Save presentation')).on('click', () => {
//    remote.getCurrentWindow().webContents.send('saveProject');
//});
//const insertSlideButtonEl = createComponent().getEl('#insertSlide').setText(() => _('Insert slide')).on('click', () => {
//    editor.insert('::::slide\n\n::::');    
//});
//const insertImageButtonEl = createComponent().getEl('#insertImage').setText(() => _('Insert image')).on('click', () => {
//    mainProcess.openImg(remote.getCurrentWindow());
//});
//const previewWinButtonEl = createComponent().getEl('#previewWin').setText(() => _('Open preview in a new window')).on('click', () => {
//    remote.getCurrentWindow().webContents.send('openPreview');
//});

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
//ipcRenderer
//    .on('fileOpened', (event, file, content) => {
//        mainProcess.updateMenu();
//        editor.setMdContent(content);
//        document.title = 'REMEDI - ' + file;
//    })
//    .on('insert', (event, content, pattern) => {
//        editor.insert(content, pattern);
//    })
//    .on('languageChanged', () => {
//        ui.refreshAllTexts();
//    })
//    .on('openPreview', (event) => {
//        mainProcess.openPreview(editor.getHtml());
//    })
//    .on('togglePreview', (event, showPreview, configuration, theme) => {
//        if (showPreview) {
//            previewOn = true;
//            document.body.classList.add('previewOn');
//            addRevealCss(theme);
//            //wait for css loading
//            setTimeout(() => {
//                initReveal(configuration);
//            },100)
//        } else {
//            previewOn = false;
//            document.body.classList.remove('previewOn');
//            removeRevealCss();
//        }
//    })
//    .on('themeChange', (event, theme) => {
//        if (previewOn) {
//            updateThemeCss(theme);
//        }
//    })
//    .on('configurationChange', (event, configuration) => {
//        Reveal.configure(configuration);
//    })
//    .on('uiConfigurationChanged', (event, uiConfiguration) => {
//        document.querySelector('#colorSchemeLink').href = `skins/${uiConfiguration.colorScheme}.css`
//        if (uiConfiguration.showButtonText) {
//            document.body.classList.remove('hideButtonText');
//        } else {
//            document.body.classList.add('hideButtonText');
//        }
//    })
//    .on('updateMenu', () => {
//        mainProcess.updateMenu();
//    })
//    .on('unShuffle', (event, configuration) => {
//        editor
//            .resetPreview()
//            .renderMd()
//        ;
//        
//        initReveal(configuration);
//    })
//    .on('imgPath', (event, imgPath) => {
//        editor.insert(`![](${imgPath.replace(/ /g,'%20')})`, /!\[[^\]]*\]\([^)]+\)/);
//    })
//    .on('saveProject', () => {
//        let html = editor.getHtml();
//        let md = editor.getMd();
//        let mediaFiles = [];
//
//        if (exportMedia) {
//            mediaFiles = getMediaFiles(md);
//            html = updateMediaPath(html);
//            md = updateMediaPath(md);
//        }
//
//        mainProcess.saveProject(html, md, true, mediaFiles);
//    })
//    .on('saveMD', () => {mainProcess.saveMd(editor.getMd());})
//    .on('saveHTML', () => {mainProcess.saveProject(editor.getHtml());})
//    .on('copyHTML', () => clipboard.writeText(editor.getHtml()))
//    .on('getCurrentSlideBackgrounSettings', () => {
//        var currentLine = editor.getCurrentEditLine().text;
//        var currentSettings;
//        
//        if (currentLine.match(/^:+slide/)) {
//            let currentSlideAttr = currentLine
//                .replace(/^:+slide */, '')
//                .trim()
//                .replace(/" /g, '"!')
//                .split('!')
//                .filter(item => item.match(/^background-[^=]+="[^"]+"/))
//            ;
//
//            if (currentSlideAttr.length) {
//                currentSettings = currentSlideAttr
//                    .map(item => {
//                        let itemBits = item.split('=');
//
//                        return {
//                            key: itemBits[0],
//                            value: itemBits[1].replace(/"/g, '')
//                        };
//                    });
//            }
//        }
//        
//        mainProcess.openBgWin(currentSettings);
//    })
//;
//
////Open links in new window
//document.addEventListener('click', (event) => {
//    if (event.target.tag === 'a' && event.target.href.match(/^http/)) {
//        event.preventDefault();
//        shell.openExternal(event.target.href);
//    }
//});
//
////Prevent the opening of speakers note
//document.body.addEventListener('keydown', (e) => {
//    if (e.key === 's') {
//        e.stopPropagation();
//    }
//});