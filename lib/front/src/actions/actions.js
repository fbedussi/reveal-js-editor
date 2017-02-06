import { remote, clipboard } from 'electron';
const mainProcess = remote.require('./main');
import { getHtml, getMd, getExportMedia, getEditorData } from '../selectors';
import { getCurrentSlideBgSettingsFromEditor } from '../utils/editorUtils';

function copyToClipboardStart() {
	return { type: 'COPY_TO_CLIPBOARD_START' };
}

function copyToClipboardEnd() {
	return { type: 'COPY_TO_CLIPBOARD_END' };
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
	return { type: 'CHANGE_LANGUAGE', newLanguageIso };
}

export function mdChanged(md) {
	return { type: 'MD_CHANGED', md };
}

export function editorPosChanged(payload) {
	return { type: 'EDITOR_POS_CHANGED', payload };
}

export function insert(arg1, arg2) {
	var stringsToInsert = Array.isArray(arg1)? arg1 : [{insert: arg1, pattern: arg2}];
	return { type: 'INSERT', stringsToInsert };
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
				dispatch(insert(`![](${imgPath.replace(/ /g, '%20')})`, /!\[[^\]]*\]\([^)]+\)/));
			})
			.catch(() => {
				return;
			})
			;
	}
}

export function openSlideBgPanel() {
	return function (dispatch, getState) {
		var state = getState();
		var currentSettings = getCurrentSlideBgSettingsFromEditor(getEditorData(state));

		dispatch({ type: 'OPEN_SLIDE_BG_PANEL', currentSettings })
	}
}

export function setBgImage(path) {
	return {type: 'SET_SLIDE_BG_IMAGE', path};
}

export function setBgVideo(path) {
	return {type: 'SET_SLIDE_BG_VIDEO', path};
}

export function openBgImage() {
	return function (dispatch, getState) {
		mainProcess.getFilePath('img')
			.then((response) => {
				let path = response.filePath;
				dispatch(setBgImage(path));
			})
			.catch(() => {
				let path = '';
				dispatch(setBgImage(path));
			})
	}
}

export function openFilePath(fileType, finalAction) {
	return function (dispatch, getState) {
		mainProcess.getFilePath(fileType)
			.then((response) => {
				let path = response.filePath;
				dispatch(finalAction(path));
			})
			.catch(() => {
				let path = '';
				dispatch(finalAction(path));
			})
	}
}

export function closeBgSettingsPanel() {
	return { type: 'CLOSE_SLIDE_BG_PANEL' };
}

export function togglePreviewPanel() {
	return { type: 'TOGGLE_PREVIEW_PANEL' };
}

export function openPreviewWin() {
	return { type: 'OPEN_PREVIEW_WIN' };
}

export function setTheme(themeName) {
	return {type: 'SET_THEME', themeName};
}
