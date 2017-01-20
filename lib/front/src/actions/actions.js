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

//export function updateMenuRequest() {
//    return {type: 'UPDATE_MENU_REQUEST'};
//}
//
//export function updateMenuSuccess() {
//    return {type: 'UPDATE_MENU_SUCCESS'};
//}
//
//export function menuUpdated() {
//    return { type: 'MENU_UPDATED'};
//}

export function changeLanguage(newLanguageIso) {
    return { type: 'CHANGE_LANGUAGE', newLanguageIso};
}


export function mdEdited(mdValue) {
    return { type: 'MD_EDITED', mdValue};
}