export default function ui(state = {
	currentColorScheme: 'dark',
	previewPanelOpen: false,
	currentTheme: 'black',
	confPanelOpen: false,
	themesPanelOpen: false,
	showButtonText: true,
	languages: ['it', 'en'],
	colorSchemes: [],
	currentColorScheme: 'dark',
	customThemes: [],
	currentLanguage: 'en',
	labels: null
}, action) {
	switch (action.type) {
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
				labels: action.labels
			});

		case 'OPEN_THEMES_PANEL':
			return Object.assign({}, state, {themesPanelOpen: !state.themesPanelOpen});

		case 'CLOSE_THEMES_PANEL':
			return Object.assign({}, state, {themesPanelOpen: false});

		case 'CUSTOM_THEME_DELETE_SUCCESS':
			return Object.assign({}, state, {customThemes: state.customThemes.filter(theme => theme != action.theme)});

		default:
			return state;
	}
}
