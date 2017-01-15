import {remote} from 'electron';
const mainProcess = remote.require('./main');
//import {menuUpdate} from './menu';


export function updateMenuRequest() {
    return {type: 'UPDATE_MENU_REQUEST'};
}

export function updateMenuSuccess() {
    return {type: 'UPDATE_MENU_SUCCESS'};
}

export function openFileSuccess(payload) {
    return { type: 'OPEN_FILE_SUCCESS', payload};
}

export function openFileRequest() {
    return { type: 'OPEN_FILE_REQUEST'};
}

export function openFile() {
    return function (dispatch) {
        dispatch(openFileRequest());
        
        mainProcess
            .openFile()
            .then(([{configuration}, {fileName, content}]) => {
                //TODO: update configuration
                dispatch(updateMenuRequest())
                dispatch(openFileSuccess({fileName, content}));
            })
        ;
    }
}

export function saveProjectRequest() {
    return { type: 'SAVE_PROJECT_REQUEST'};
}

export function saveProjectSuccess() {
    return { type: 'SAVE_PROJECT_SUCCESS'};
}

export function saveProject(html, md, withDependecies) {
    return function (dispatch) {
        dispatch(saveProjectRequest());
        
        mainProcess
            .saveProject(html, md, withDependecies)
            .then(() => {
                dispatch(saveProjectSuccess());       
            })
        ;
    }
}

export function fileSaved() {
    return { type: 'FILE_SAVED'};
}

export function saveMd() {
    return { type: 'SAVE_MD'};
}

export function saveHtml() {
    return { type: 'SAVE_HTML'};
}

export function copyHtml() {
    return { type: 'COPY_HTML'};
}

export function showInFolder() {
    return { type: 'SHOW_IN_FOLDER'};
}

export function openInEditor() {
    return { type: 'OPEN_IN_EDITOR'};
}

export function changeLanguage(newLanguageIso) {
    return { type: 'CHANGE_LANGUAGE', newLanguageIso};
}

export function menuUpdated() {
    return { type: 'MENU_UPDATED'};
}

export function mdEdited(mdValue) {
    return { type: 'MD_EDITED', mdValue};
}