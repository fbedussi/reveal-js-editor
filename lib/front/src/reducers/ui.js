export default function ui(state = {
	currentColorScheme: 'dark',
	notificationDuration: 2000,
	previewPanelOpen: false,
	previewWindow: false,
	currentTheme: 'black',
	isCurrentThemeCustom: false,
	customThemePath: '../../../lib/customThemes',
	confPanelOpen: false,
	themesPanelOpen: false,
	showButtonText: true,
	languages: ['it', 'en'],
	colorSchemes: [],
	currentColorScheme: 'dark',
	customThemes: [],
	currentLanguage: 'en',
	labels: null,
	customCss: '',
	slideBgpanelOpen: false,
	init: false
}, action) {
	switch (action.type) {
		case 'SET_THEME':
			return Object.assign({}, state, {
				currentTheme: action.themeName,
				isCurrentThemeCustom: action.isCustomTheme,
				customThemePath: action.themePath? action.themePath : state.customThemePath
			});

		case 'TOGGLE_PREVIEW_PANEL':
			return Object.assign({}, state, {previewPanelOpen: !state.previewPanelOpen});

		case 'OPEN_PREVIEW_WIN':
			//return Object.assign({}, state, {previewWindow: action.previewWindow});
			return Object.assign({}, state, {previewWindow: true});

		case 'OPEN_CONF_PANEL':
			return Object.assign({}, state, {
				confPanelOpen: !state.confPanelOpen,
				themesPanelOpen: false,
				slideBgpanelOpen: false
			});

		case 'CLOSE_CONF_PANEL':
			return Object.assign({}, state, {confPanelOpen: false});

		case 'SET_UI_CONF':
			return Object.assign({}, state, action.newConf);

		case 'CHANGE_LANGUAGE':
			return Object.assign({}, state, {
				currentLanguage: action.newLanguageIso,
				labels: action.labels
			});

		case 'SET_COLOR_SCHEME':
			return Object.assign({}, state, {currentColorScheme: action.colorScheme})

		case 'OPEN_THEMES_PANEL':
			return Object.assign({}, state, {
				themesPanelOpen: !state.themesPanelOpen,
				confPanelOpen: false,
				slideBgpanelOpen: false
			});

		case 'CLOSE_THEMES_PANEL':
			return Object.assign({}, state, {themesPanelOpen: false});

		case 'CUSTOM_THEME_DELETE_SUCCESS':
			return Object.assign({}, state, {customThemes: state.customThemes.filter(theme => theme != action.theme)});

		case 'CUSTOM_THEME_LOAD_SUCCESS':
			return Object.assign({}, state, {customThemes: state.customThemes.concat(action.theme)});

		case 'SET_CUSTOM_CSS':
			return Object.assign({}, state, {customCss: action.css});

		case 'OPEN_SLIDE_BG_PANEL':
			return Object.assign({}, state, {
				slideBgpanelOpen: !state.slideBgpanelOpen,
				confPanelOpen: false,
				themesPanelOpen: false
			});

		case 'CLOSE_SLIDE_BG_PANEL':
			return Object.assign({}, state, {slideBgpanelOpen: false});

		case 'SET_INIT':
			return Object.assign({}, state, {init: true});

		default:
			return state;
	}
}
