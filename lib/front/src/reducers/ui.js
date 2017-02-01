export default function ui(state = {
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
