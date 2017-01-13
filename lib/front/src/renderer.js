//Electron inport
//const {ipcRenderer, remote, clipboard, shell} = require('electron');
import {ipcRenderer, remote, clipboard, shell} from 'electron';

//import './spellCheckerInit';
//import editor from './editor.js';

const mainProcess = remote.require('./main');
import {menuUpdate, menuInit} from './menu';
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
import {Provider, connect} from 'react-redux';
import * as reducers from './reducers';
import {openFile, fileSaved, changeLanguage} from './actions';

import App from './components/App';


const store = createStore(combineReducers(reducers));

function electronConnect(state) {
   if (state.main.openFileRequest) {
      mainProcess.openFile();
   }
   
   if (state.main.saveProjectRequest) {
      mainProcess.saveProject(state.main.html, state.main.md, true, state.main.mediaFiles);
   }
   
   if (state.main.menuUpdateRequest) {
      menuUpdate(state);
   }
}

function run() {
   let state = store.getState();
   
   electronConnect(state);
   
   ReactDOM.render(
               <Provider store={store}>
                  <App />
               </Provider>, document.getElementById('app'));
}

run();
menuInit(store);
store.subscribe(run);

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




//Main process listeners
ipcRenderer
    .on('fileOpened', (event, fileName, content) => {
        store.dispatch(openFile({fileName, content}));
    })
    .on('fileSaved', (event) => {
        store.dispatch(fileSaved());
    })
    .on('insert', (event, content, pattern) => {
        editor.insert(content, pattern);
    })
   .on('changeLanguage', (event, newLanguageIso) => {
      store.dispatch(changeLanguage(newLanguageIso));
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
    .on('uiConfigurationChanged', (event, uiConfiguration) => {
        document.querySelector('#colorSchemeLink').href = `skins/${uiConfiguration.colorScheme}.css`
        if (uiConfiguration.showButtonText) {
            document.body.classList.remove('hideButtonText');
        } else {
            document.body.classList.add('hideButtonText');
        }
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
;
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