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
import ui from './reducers/ui';
import configuration from './reducers/configuration';

import {openFile, fileSaved} from './actions/fileActions';
import {init} from './actions/actions';


import App from './components/App';

const store = createStore(combineReducers({bgSlide, editor, file, ui, configuration}), applyMiddleware(thunkMiddleware));

function run() {
   let state = store.getState();

   ReactDOM.render(
               <Provider store={store}>
                  <App />
               </Provider>, document.getElementById('app'));
}

run();
store.subscribe(run);
store.dispatch(init());

//Main process listeners
ipcRenderer
    .on('openPreview', (event) => {
        mainProcess.openPreview(editor.getHtml());
    })
    .on('unShuffle', (event, configuration) => {
        editor
            .resetPreview()
            .renderMd()
        ;

        initReveal(configuration);
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
