export function getLabels(state) {
    return state.language.labels;
}

export function getLabel(state) {
    return function(key) {
        return state.language.labels[key]
    };
}

export function getLanguageIso(state) {
    return state.language.currentLanguage;
}

export function getCurrentColorScheme(state) {
    return state.ui.currentColorScheme;
}

export function getHtml(state) {
    return state.main.html;
}

export function getMd(state) {
    return state.main.md;
}

export function getExportMedia(state) {
    return state.main.exportMedia;
}

export function getCurrentFileName(state) {
    return state.main.currentFileName;
}

export function getEditorData(state) {
	return {
		text: state.main.md,
		selectionStart: state.main.selectionStart,
		selectionEnd: state.main.selectionEnd
	}
}

export function getLeftPanelStatus(state) {
	return state.ui.bgOptionsPanelOpen;
}

export function getCurrentSlideBgSettings(state) {
	return state.ui.currentSlideBgSettings;
}

export function getSlideBgImage(state) {
	return (state.ui.currentSlideBgSettings && state.ui.currentSlideBgSettings['background-image'])? {'background-image': state.ui.currentSlideBgSettings['background-image']} : null;
}
