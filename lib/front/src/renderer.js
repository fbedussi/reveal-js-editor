//Electron inport
import {ipcRenderer, remote, clipboard, shell} from 'electron';

//import './spellCheckerInit';

const mainProcess = remote.require('./main');

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider, connect} from 'react-redux';

//Reducers
import bgSlide from './reducers/bgSlide';
import editor from './reducers/editor';
import file from './reducers/file';
import language from './reducers/language';
import ui from './reducers/ui';
import configuration from './reducers/configuration';

import {openFile, fileSaved} from './actions/fileActions';
import {changeLanguage} from './actions/actions';


import App from './components/App';

const store = createStore(combineReducers({bgSlide, editor, file, language, ui, configuration}), applyMiddleware(thunkMiddleware));

function run() {
   let state = store.getState();

   ReactDOM.render(
               <Provider store={store}>
                  <App />
               </Provider>, document.getElementById('app'));
}

run();
store.subscribe(run);

//Variables
var themeCssEl;
var previewOn = false;
var exportMedia = true;






//Main process listeners
ipcRenderer
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
