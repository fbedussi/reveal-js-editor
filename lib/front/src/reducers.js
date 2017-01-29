import md from './mdConverter';
import {loadTranslationsSync} from '../../language';

export function main(state = {
	md: '',
	selectionStart: 0,
	selectionEnd: 0,
	insert: null,
	html: '',
	currentFileName: '',
	openFileRequest: false,
	saveProjectRequest: false,
	exportMedia: true,
	saveMdRequest: false,
	saveHtmlRequest: false,
	copyToClipBoard: false,
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
				selectionStart: 0,
				selectionEnd: 0,
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

		case 'SAVE_HTML_REQUEST':
			return Object.assign({}, state, {
				saveHtmlRequest: true,
			});

		case 'SAVE_HTML_SUCCESS':
			return Object.assign({}, state, {
				saveHtmlRequest: false
			});

		case 'SAVE_HTML_ERROR':
			return Object.assign({}, state, {
				saveHtmlRequest: false
			});

		case 'SAVE_HTML_ABORTED':
			return Object.assign({}, state, {
				saveHtmlRequest: false
			});

		case 'COPY_TO_CLIPBOARD_START':
			return Object.assign({}, state, {
				copyToClipBoard: true
			});

		case 'COPY_TO_CLIPBOARD_END':
			return Object.assign({}, state, {
				copyToClipBoard: false
			});


		case 'MD_EDITED':
			return Object.assign({}, state, {
				md: action.payload.value,
				html: md.render(action.payload.value),
				insert: null
			});

		case 'EDITOR_POS_CHANGED':
		console.log('pos', action.payload.selectionEnd);
			return Object.assign({}, state, {
				selectionStart: action.payload.selectionStart,
				selectionEnd: action.payload.selectionEnd,
			});

		case 'INSERT':
			return Object.assign({}, state, {
				insert: {text: action.text, pattern: action.pattern}
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
	currentColorScheme: 'dark',
	bgOptionsPanelOpen: false,
	currentSlideBgSettings: null
}, action) {
	switch (action.type) {
		case 'CHANGE_COLOR_SCHEME':
			return Object.assign({}, state, {
				currentColorScheme: action.newColorScheme,
			});

		case 'OPEN_BG_SETTINGS_PANEL':
			return Object.assign({}, state, {
				bgOptionsPanelOpen: !state.bgOptionsPanelOpen,
				currentSlideBgSettings: action.currentSettings
			});

		case 'CLOSE_BG_SETTINGS_PANEL':
			return Object.assign({}, state, {
				bgOptionsPanelOpen: false,
				currentSlideBgSettings: null
			});

		default:
			return state;
	}
}

// export function slideBg() {
// 	switch (action.type) {
// 		case 'SET_SLIDE_BG_IMAGE':
// 			return Object.assign({}, state, {
// 				currentSlideBgSettings.slideBgImage: action.path,
// 			});
// 	}
// }
