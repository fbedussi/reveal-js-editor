export function getLabels(state) {
    return state.language.labels;
}

export function getLanguageIso(state) {
    return state.language.currentLanguage;
}

export function getCurrentColorScheme(state) {
    return state.ui.currentColorScheme;
}
