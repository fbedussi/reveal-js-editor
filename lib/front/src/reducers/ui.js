export default function ui(state = {
	currentColorScheme: 'dark',
	previewPanelOpen: false,
	currentTheme: 'black',
	confPanelOpen: false,
	showButtonText: true,
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

		default:
			return state;
	}
}
