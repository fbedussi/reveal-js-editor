//TODO: catch errors on promises & dispatch actions to trigger notifications display
import {remote, shell} from 'electron';
const mainProcess = remote.require('./main');
import {getHtml, getMd, getExportMedia, getCurrentFileName, getConfiguration, getCurrentTheme, getCustomCss, isCustomTheme} from '../selectors';
import {mdChanged, editorPosChanged, setConfiguration, setCustomCss, setTheme} from './actions';

function openFileSuccess(fileName) {
    return { type: 'OPEN_FILE_SUCCESS', fileName};
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

        openFile.then(([{remedi}, {configuration}, {customCss}, {fileName, content}]) => {
				if (remedi && remedi.theme) {
                	dispatch(setTheme(remedi.theme));
				}

                dispatch(setCustomCss(customCss));
                dispatch(setConfiguration(configuration));
                dispatch(openFileSuccess(fileName));
				dispatch(mdChanged(content));
				dispatch(editorPosChanged({selectionStart: 0, selectionEnd: 0}));
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
            .saveProject({
				html: getHtml(state),
				md: getMd(state),
				withDependencies: getExportMedia(state),
				conf: getConfiguration(state),
				theme: getCurrentTheme(state),
				isCustomTheme: isCustomTheme(state),
				customCss: getCustomCss(state),
			})
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

export function delCustomTheme(theme) {
	return function (dispatch) {
		mainProcess.delCustomTheme(theme)
			.then(() => {
				dispatch({type: 'CUSTOM_THEME_DELETE_SUCCESS', theme})
			})
			.catch(() => {
				dispatch({type: 'CUSTOM_THEME_DELETE_ERROR'})
			})
	}
}

export function loadCustomTheme(theme) {
	return function (dispatch) {
		mainProcess
			.getFilePath('css')
			.then((response) => {
				return mainProcess.loadCustomTheme(response.filePath);
			})
			.then(({fileName}) => {
				dispatch({type: 'CUSTOM_THEME_LOAD_SUCCESS', theme: fileName})
			})
			.catch(() => {
				dispatch({type: 'CUSTOM_THEME_LOAD_ERROR'})
			})
	}
}
