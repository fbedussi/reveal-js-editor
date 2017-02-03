export default function ui(state = {
	currentColorScheme: 'dark',
	previewPanelOpen: false,
	currentTheme: 'black'
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

		default:
			return state;
	}
}
