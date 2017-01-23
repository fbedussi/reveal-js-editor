import {remote, clipboard} from 'electron';
const mainProcess = remote.require('./main');
import {getHtml, getMd, getExportMedia} from '../selectors';

function copyToClipboardStart() {
    return { type: 'COPY_TO_CLIPBOARD_START'};
}

function copyToClipboardEnd() {
    return { type: 'COPY_TO_CLIPBOARD_END'};
}

export function copyHtmlToClipboard() {
     return function (dispatch, getState) {
        dispatch(copyToClipboardStart());
        
        var state = getState();
        
        clipboard.writeText(getHtml(state));
        
        setTimeout(() => {
            dispatch(copyToClipboardEnd());
        }, 1000);
    }
}

export function changeLanguage(newLanguageIso) {
    return { type: 'CHANGE_LANGUAGE', newLanguageIso};
}

export function mdEdited(mdValue) {
    return { type: 'MD_EDITED', mdValue};
}

export function insert(text, pattern) {
    return { type: 'INSERT', text, pattern};
}

export function insertImage() {
    return function (dispatch) {
        var filePathRequest = mainProcess.getFilePath('img');
        
        if (!filePathRequest) {
            return;
        }
        
        filePathRequest
            .then((response) => {
                let imgPath = response.filePath;
                dispatch(insert(`![](${imgPath.replace(/ /g,'%20')})`, /!\[[^\]]*\]\([^)]+\)/));
            })
            .catch(() => {
                return;
            })
        ;
    }
}

function getBgShortcode(key, value) {
    switch (key) {
        case 'slideBgColor':
            return {
                value: `background="${value}"`,
                pattern: ''
            }
    }
}

export function setBgOptions() {
    return function (dispatch, getStatus) {
        //TODO get current bg values
        mainProcess
            .openBgWin()
            .then(response => {
                Object.keys(response).forEach(key => {
                    var bgShortCode = getBgShortcode(key, response[key]);
                    dispatch(insert(bgShortCode.value, bgShortCode.pattern));     
                })
            })
        ;
    }
}