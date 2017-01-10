import {renderMarkdownToHtml} from './editor.js';
import {loadTranslationsSync} from '../language';

export function main(state = {
	md: '',
	html: '',
	currentFileName: '',
	openFileRequest: false
}, action) {
	switch (action.type) {
		case 'OPEN_FILE':
			return Object.assign({}, state, {
				md: action.payload.content,
				html: renderMarkdownToHtml(action.payload.content),
				currentFileName: action.payload.fileName,
				openFileRequest: false
			});
		case 'OPEN_FILE_REQUEST':
			return Object.assign({}, state, {
				openFileRequest: true
			});
		default:
			return state;
	}
}

export function language(state = {
	currentLanguage: 'en',
	translations: loadTranslationsSync('en'),
}, action) {
	switch (action.type) {
		case 'CHANGE_LANGUAGE':
			return Object.assign({}, state, {
				currentLanguage: action.newLanguageIso,
				translations: loadTranslationsSync(action.newLanguageIso)
			});
		default:
			return state;
	}
}