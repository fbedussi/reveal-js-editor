export function getLabels(state) {
    return state.language.labels;
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