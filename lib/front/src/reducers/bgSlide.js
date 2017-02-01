function getBlankState() {
	return {
		panelOpen: false,
		'background-color': '#000000',
		'background-image': ''
	};
}
export default function bgSlide(state = getBlankState(), action) {
	switch (action.type) {
		case 'OPEN_BG_SETTINGS_PANEL':
			return Object.assign({}, state, {
				panelOpen: !state.bgOptionsPanelOpen,
				'background-color': action.currentSettings['background-color'],
				'background-image': action.currentSettings['background-image'],
			});

		case 'CLOSE_BG_SETTINGS_PANEL':
			return Object.assign({}, state, getBlankState());

		case 'SET_SLIDE_BG_IMAGE':
			return Object.assign({}, state, {
				'background-image': action.path
			});

		default:
			return state;
	}
}
