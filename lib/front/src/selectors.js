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

export function getSaveProjectRequest(state) {
	return state.file.saveProjectRequest
}

export function getEditorData(state) {
	return {
		text: state.editor.md,
		selectionStart: state.editor.selectionStart,
		selectionEnd: state.editor.selectionEnd
	}
}

export function getLeftPanelStatus(state) {
	return state.bgSlide.panelOpen;
}

export function getCurrentSlideBgSettings(state) {
	var slideBgSettings = Object.assign({}, state.bgSlide);
	delete slideBgSettings.panelOpen;

	return slideBgSettings;
}

export function getSlideBgImage(state) {
	return state.bgSlide['background-image']
}
