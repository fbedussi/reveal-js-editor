import {remote, shell} from 'electron';
const mainProcess = remote.require('./main');
import {getHtml, getMd, getExportMedia, getCurrentFileName} from '../selectors';

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

function saveHtmlRequest() {
    return { type: 'SAVE_HTML_REQUEST'};
}

function saveHtmlAborted() {
    return { type: 'SAVE_HTML_ABORTED'};
}

function saveHtmlSuccess() {
    return { type: 'SAVE_HTML_SUCCESS'};
}


function saveHtmlError() {
    return { type: 'SAVE_HTML_ERROR'};
}

export function saveHtml() {
    return function (dispatch, getState) {
        dispatch(saveHtmlRequest());

        var state = getState();

        var saveHtml = mainProcess.saveProject(getHtml(state));

        if (!saveHtml) {
            return dispatch(saveMdAborted());
        }
        saveHtml
            .then(() => {
                dispatch(saveHtmlSuccess());
            })
            .catch(() => {
                dispatch(saveHtmlError());
            })
        ;
    }
}

export function showInFolder() {
    return function (dispatch, getState) {
        var state = getState();

        shell.showItemInFolder(getCurrentFileName(state));
    }
}

export function openInEditor() {
    return function (dispatch, getState) {
        var state = getState();

        shell.openItem(getCurrentFileName(state));
    }
}
