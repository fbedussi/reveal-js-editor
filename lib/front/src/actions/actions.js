import { remote, clipboard } from 'electron';
const mainProcess = remote.require('./main');
import { getHtml, getMd, getExportMedia, getEditorData } from '../selectors';
import { getCurrentSlideBgSettings } from '../utils/editor';

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

export function mdEdited(payload) {
	return { type: 'MD_EDITED', payload };
}

export function editorPosChanged(payload) {
	return { type: 'EDITOR_POS_CHANGED', payload };
}

export function insert(text, pattern) {
	return { type: 'INSERT', text, pattern };
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

export function setBgOptions() {
	return function (dispatch, getState) {
		var state = getState();
		var currentSettings = getCurrentSlideBgSettings(getEditorData(state));

		dispatch({ type: 'OPEN_BG_SETTINGS_PANEL', currentSettings })
	}
}

export function setBgImage(path) {
	return {type: 'SET_SLIDE_BG_IMAGE', path};
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

export function closeBgSettingsPanel() {
	return { type: 'CLOSE_BG_SETTINGS_PANEL' };
}
