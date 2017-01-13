export function openFile(payload) {
    return { type: 'OPEN_FILE', payload};
}

export function openFileRequest() {
    return { type: 'OPEN_FILE_REQUEST'};
}

export function saveProjectRequest() {
    return { type: 'SAVE_PROJECT_REQUEST'};
}

export function fileSaved() {
    return { type: 'FILE_SAVED'};
}

export function saveMd() {
    return { type: 'SAVE_MD'};
}

export function saveHtml() {
    return { type: 'SAVE_HTML'};
}

export function copyHtml() {
    return { type: 'COPY_HTML'};
}

export function showInFolder() {
    return { type: 'SHOW_IN_FOLDER'};
}

export function openInEditor() {
    return { type: 'OPEN_IN_EDITOR'};
}

export function changeLanguage(newLanguageIso) {
    return { type: 'CHANGE_LANGUAGE', newLanguageIso};
}

export function menuUpdated() {
    return { type: 'MENU_UPDATED'};
}