import {loadTranslationsSync} from '../../../language';

export default function ui(state = {
	currentColorScheme: 'dark',
	previewPanelOpen: false,
	currentTheme: 'black',
	confPanelOpen: false,
	showButtonText: true,
	languages: ['it', 'en'],
	colorSchemes: [],
	currentColorScheme: 'dark',
	currentLanguage: 'en',
	labels: loadTranslationsSync('en')
}, action) {
	switch (action.type) {
		case 'SET_COLOR_SCHEME':
			return Object.assign({}, state, {
				currentColorScheme: action.newColorScheme,
			});

		case 'SET_THEME':
			return Object.assign({}, state, {currentTheme: action.themeName});

		case 'TOGGLE_PREVIEW_PANEL':
			return Object.assign({}, state, {previewPanelOpen: !state.previewPanelOpen});

		case 'OPEN_CONF_PANEL':
			return Object.assign({}, state, {confPanelOpen: !state.confPanelOpen});

		case 'CLOSE_CONF_PANEL':
			return Object.assign({}, state, {confPanelOpen: false});

		case 'SET_UI_CONF':
			return Object.assign({}, state, action.newConf);

		case 'CHANGE_LANGUAGE':
			return Object.assign({}, state, {
				currentLanguage: action.newLanguageIso,
				labels: loadTranslationsSync(action.newLanguageIso)
			});

		case 'UPDATE_COLOR_SCHEMES_LIST':
			return Object.assign({}, state, {colorSchemes: action.colorSchemesList})

		default:
			return state;
	}
}
