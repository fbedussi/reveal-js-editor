import {remote, clipboard} from 'electron';
const mainProcess = remote.require('./main');
import {getHtml, getMd, getExportMedia, getEditorData, getCurrentLanguage,
	getConfiguration, getCustomCss, getCurrentTheme, getCustomThemesList} from '../selectors';
import {getCurrentSlideBgSettingsFromEditor} from '../utils/editorUtils';

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

export function init() {
	return function (dispatch, getState) {
		mainProcess.getRemediConfig()
			.then(remediConfig => {
				dispatch(setColorSchemeWithoutSaving(remediConfig.currentColorScheme));
				dispatch(changeLanguageWithoutSaving(remediConfig.currentLanguage));
				dispatch(setRecentFiles(remediConfig.recentFiles))
			})
		;

		mainProcess.getThemesList()
			.then(colorSchemes => {
				dispatch(setUiConf({colorSchemes}));
			})
		;

		mainProcess.getLanguagesList()
			.then(languages => {
				dispatch(setUiConf({languages}));
			})
		;

		mainProcess.getCustomThemesList()
			.then(customThemes => {
				dispatch(setUiConf({customThemes}));
			})
		;
	}
}

function changeLanguageWithoutSaving(newLanguageIso) {
	return function(dispatch) {
		mainProcess.loadLabels(newLanguageIso)
				.then(labels => {dispatch({type: 'CHANGE_LANGUAGE', newLanguageIso, labels})})
	}
}


export function setRecentFiles(recentFiles) {
	return {type: 'SET_RECENT_FILES', recentFiles};
}

export function changeLanguage(newLanguageIso) {
	return function(dispatch) {
		mainProcess.saveRemediConfig({currentLanguage: newLanguageIso});

		dispatch(changeLanguageWithoutSaving(newLanguageIso));
	};
}

export function mdChanged(md) {
	return { type: 'MD_CHANGED', md };
}

export function mdLoaded(md) {
	return { type: 'MD_LOADED', md };
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
	// return function (dispatch) {
	// 	mainProcess
	// 		.openPreviewWin()
	// 		.then(previewWindow => {
	// 			dispatch({type: 'OPEN_PREVIEW_WIN', previewWindow});
	// 		})
	// 	;
	// }

	// return function (dispatch, getState) {
	// 	var win = window.open('preview/preview.html', 'preview', '');
	// 	var state = getState();
	// 	var currentTheme = getCurrentTheme(state);
	// 	var message = {
	// 			html: getHtml(state),
	// 			configuration: getConfiguration(state),
	// 			customCss: getCustomCss(state),
	// 			currentTheme: currentTheme,
	// 			customTheme: getCustomThemesList(state).includes(currentTheme)
	// 		};

	// 	// window.addEventListener("message", (event) => {
	// 	// 	//this.ifr.focus();
	// 	// });
	// 	setTimeout(() => {
	// 		win.postMessage(message, "*");
	// 	}, 200);

	// }
	return { type: 'OPEN_PREVIEW_WIN' };
}

export function setTheme(themeName, isCustomTheme = false, themePath = null) {
	return {type: 'SET_THEME', themeName, isCustomTheme, themePath};
}

export function setTransition(transitionName) {
	return {type: 'SET_CONFIGURATION', newConf: {transition: transitionName}}
}

export function setConfiguration(newConf) {
	return {type: 'SET_CONFIGURATION', newConf}
}

export function openConfPanel() {
	return {type: 'OPEN_CONF_PANEL'}
}

export function closeConfPanel() {
	return {type: 'CLOSE_CONF_PANEL'}
}

export function closeThemesPanel() {
	return {type: 'CLOSE_THEMES_PANEL'}
}

export function setTempParallaxBgImage(path) {
	return {type: 'SET_TEMP_PARALLAX_BG_IMAGE', path};
}

export function setDefaultExtraConf() {
	return {type: 'SET_DEFAULT_EXTRA_CONF'}
}

export function setUiConf(newConf) {
	return {type: 'SET_UI_CONF', newConf};
}

export function openThemesPanel() {
	return {type: 'OPEN_THEMES_PANEL'};
}

export function setCustomCss(css) {
	return {type: 'SET_CUSTOM_CSS', css};
}

export function setInit() {
	return {type: 'SET_INIT'};
}

function setColorSchemeWithoutSaving(colorScheme) {
	return {type: 'SET_COLOR_SCHEME', colorScheme};
}

export function setColorScheme(colorScheme) {
	return function(dispatch) {
		mainProcess.saveRemediConfig({currentColorScheme: colorScheme});

		dispatch(setColorSchemeWithoutSaving(colorScheme));
	}
}
