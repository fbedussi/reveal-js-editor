import {remote} from 'electron';
const mainProcess = remote.require('./main');
import {getHtml, getMd, getExportMedia} from './selectors';


export function updateMenuRequest() {
    return {type: 'UPDATE_MENU_REQUEST'};
}

export function updateMenuSuccess() {
    return {type: 'UPDATE_MENU_SUCCESS'};
}

function openFileSuccess(payload) {
    return { type: 'OPEN_FILE_SUCCESS', payload};
}

function openFileError(err) {
    return { type: 'OPEN_FILE_ERROR', err};
}


function openFileRequest() {
    return { type: 'OPEN_FILE_REQUEST'};
}

function openFileAborted() {
    return { type: 'OPEN_FILE_ABORTED'};
}

export function openFile() {
    return function (dispatch) {
        dispatch(openFileRequest());
        
        var openFile = mainProcess.openFile();
        
        if (!openFile) {
            return dispatch(openFileAborted())
        }
            
        openFile.then(([{configuration}, {fileName, content}]) => {
                //TODO: update configuration
                dispatch(updateMenuRequest())
                dispatch(openFileSuccess({fileName, content}));
            })
            .catch((err) => {dispatch(openFileError(err))})
        ;
    }
}

function saveProjectRequest() {
    return { type: 'SAVE_PROJECT_REQUEST'};
}

function saveProjectSuccess() {
    return { type: 'SAVE_PROJECT_SUCCESS'};
}

function saveProjectError() {
    return { type: 'SAVE_PROJECT_ERROR'};
}

export function saveProject() {
    return function (dispatch, getState) {
        dispatch(saveProjectRequest());
        
        var state = getState();
        
        mainProcess
            .saveProject(getHtml(state), getMd(state), getExportMedia(state))
            .then(() => {
                dispatch(saveProjectSuccess());       
            })
            .catch(() => {
                dispatch(saveProjectError());       
            })
        ;
    }
}

function saveMdRequest() {
    return { type: 'SAVE_MD_REQUEST'};
}

function saveMdSuccess() {
    return { type: 'SAVE_MD_SUCCESS'};
}

function saveMdError() {
    return { type: 'SAVE_MD_ERROR'};
}

function saveMdAborted() {
    return { type: 'SAVE_MD_ABORTED'};
}

export function saveMd() {
    return function (dispatch, getState) {
        dispatch(saveMdRequest());
        
        var state = getState();
        
        var saveMd = mainProcess.saveMd(getMd(state));
        
        if (!saveMd) {
            return dispatch(saveMdAborted());
        }
        saveMd
            .then(() => {
                dispatch(saveMdSuccess());       
            })
            .catch(() => {
                dispatch(saveMdError());       
            })
        ;
    }
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