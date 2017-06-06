export function getLabels(state) {
    return state.ui.labels;
}

export function getLabel(state) {
    return function(key) {
        return state.ui.labels[key]
    };
}

export function getLanguageIso(state) {
    return state.ui.currentLanguage;
}

export function getCurrentColorScheme(state) {
    return state.ui.currentColorScheme;
}

export function getHtml(state) {
    return state.editor.html;
}

export function getMd(state) {
    return state.editor.md;
}

export function getInsert(state) {
    return state.editor.insert;
}

export function getExportMedia(state) {
    return state.file.exportMedia;
}

export function getCurrentFileName(state) {
    return state.file.currentFileName;
}

export function getDirtyStatus(state) {
	return state.editor.dirty;
}

export function getEditorData(state) {
	return {
		text: state.editor.md,
		selectionStart: state.editor.selectionStart,
		selectionEnd: state.editor.selectionEnd
	}
}

export function getLeftPanelStatus(state) {
	return state.ui.slideBgpanelOpen;
}

export function getInitialSlideBgSettings(state) {
	return state.bgSlide.initial;
}

export function getNewSlideBgSettings(state) {
	var newSlideBgSettings = Object.assign({}, state.bgSlide.new);
	return newSlideBgSettings;
}

export function getSlideBgImage(state) {
	return state.bgSlide['background-image']
}

export function getPreviewPanelOpen(state) {
	return state.ui.previewPanelOpen;
}

export function getCurrentTheme(state) {
	return state.ui.currentTheme;
}

export function getConfiguration(state) {
	return state.configuration;
}

export function getConfPanelStatus(state) {
	return state.ui.confPanelOpen;
}

export function getThemesPanelStatus(state) {
	return state.ui.themesPanelOpen;
}

export function getRightPanelStatus(state) {
	return state.ui.confPanelOpen || state.ui.themesPanelOpen;
}

export function getUiConf(state) {
	return state.ui;
}

export function getCurrentLanguage(state) {
	return state.ui.currentLanguage;
}

export function getCustomThemes(state) {
	return state.ui.customThemes;
}

export function getCustomCss(state) {
	return state.ui.customCss;
}

export function getInit(state) {
	return state.ui.init;
}

export function getCustomThemesList(state) {
	return state.ui.customThemes;
}

export function isCustomTheme(state) {
	return state.ui.isCurrentThemeCustom;
}

export function getCustomThemePath(state) {
	return state.ui.customThemePath;
}

export function getPreviewWin(state) {
	return state.ui.previewWindow;
}

export function getNotificationDuration(state) {
	return state.ui.notificationDuration;
}

export function getSaveProjectRequest(state) {
	return state.file.saveProjectRequest;
}

export function getSaveProjectSuccess(state) {
	return state.file.saveProjectSuccess;
}

export function getSaveProjectError(state) {
	return state.file.saveProjectError;
}

export function getRecentFiles(state) {
	return state.file.recentFiles;
}

export function getOpenFIleError(state) {
	return state.file.openFileError;
}