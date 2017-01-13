import {renderMarkdownToHtml} from './editor.js';
import {loadTranslationsSync} from '../../language';
import {getMediaFiles} from './pathHelpers';

export function main(state = {
	md: '',
	html: '',
	currentFileName: '',
	openFileRequest: false,
	saveProjectRequest: false,
	exportMedia: true,
	menuUpdateRequest: false,
	mediaFiles: []
}, action) {
	switch (action.type) {
		case 'OPEN_FILE':
			return Object.assign({}, state, {
				md: action.payload.content,
				html: renderMarkdownToHtml(action.payload.content),
				currentFileName: action.payload.fileName,
				openFileRequest: false,
				menuUpdateRequest: true
			});
		case 'MENU_UPDATED':
			return Object.assign({}, state, {
				menuUpdateRequest: false
			});
		case 'OPEN_FILE_REQUEST':
			return Object.assign({}, state, {
				openFileRequest: true
			});
		case 'SAVE_PROJECT_REQUEST':
			if (state.exportMedia) {
				var mediaFiles = getMediaFiles(state.md);
			}
			
			return Object.assign({}, state, {
				saveProjectRequest: true,
				mediaFiles
			});
		case 'FILE_SAVED':
			return Object.assign({}, state, {
				saveProjectRequest: false
			});
		default:
			return state;
	}
}

export function language(state = {
	currentLanguage: 'en',
	labels: loadTranslationsSync('en'),
}, action) {
	switch (action.type) {
		case 'CHANGE_LANGUAGE':
			return Object.assign({}, state, {
				currentLanguage: action.newLanguageIso,
				labels: loadTranslationsSync(action.newLanguageIso)
			});
		default:
			return state;
	}
}

export function ui(state = {
	currentColorScheme: 'dark'
}, action) {
	switch (action.type) {
		case 'CHANGE_COLOR_SCHEME':
			return Object.assign({}, state, {
				currentColorScheme: action.newColorScheme,
			});
		default:
			return state;
	}
}