import {renderMarkdownToHtml} from './editor.js';
import {loadTranslationsSync} from '../../language';

export function main(state = {
	md: '',
	html: '',
	currentFileName: '',
	openFileRequest: false,
	saveProjectRequest: false,
	exportMedia: true,
	savemdRequest: false,
	menuUpdateRequest: false,
	mediaFiles: []
}, action) {
	switch (action.type) {
		case 'OPEN_FILE_REQUEST':
			return Object.assign({}, state, {
				openFileRequest: true
			});
		
		case 'OPEN_FILE_SUCCESS':
			return Object.assign({}, state, {
				md: action.payload.content,
				html: renderMarkdownToHtml(action.payload.content),
				currentFileName: action.payload.fileName,
				openFileRequest: false
			});
		
		case 'OPEN_FILE_ERROR':
			return Object.assign({}, state, {
				openFileRequest: false
			});
		
		case 'OPEN_FILE_ABORTED':
			return Object.assign({}, state, {
				openFileRequest: false
			});
		
		case 'UPDATE_MENU_REQUEST':
			return Object.assign({}, state, {
				updateMenuRequest: true
			});
		
		case 'UPDATE_MENU_SUCCESS':
			return Object.assign({}, state, {
				updateMenuRequest: false
			});
		
		case 'SAVE_PROJECT_REQUEST':
			return Object.assign({}, state, {
				saveProjectRequest: true,
			});
		
		case 'SAVE_PROJECT_SUCCESS':
			return Object.assign({}, state, {
				saveProjectRequest: false
			});
		
		case 'SAVE_PROJECT_ERROR':
			return Object.assign({}, state, {
				saveProjectRequest: false
			});
		
		case 'SAVE_MD_REQUEST':
			return Object.assign({}, state, {
				saveMdRequest: true,
			});
		
		case 'SAVE_MD_SUCCESS':
			return Object.assign({}, state, {
				saveMdRequest: false
			});
		
		case 'SAVE_MD_ERROR':
			return Object.assign({}, state, {
				saveMdRequest: false
			});
		
		case 'SAVE_MD_ABORTED':
			return Object.assign({}, state, {
				saveMdRequest: false
			});
		
		
		case 'MD_EDITED':
			return Object.assign({}, state, {
				md: action.mdValue,
				html: renderMarkdownToHtml(action.mdValue),
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