function getBlankState() {
	return {
		panelOpen: false
	};
}

export default function bgSlide(state = getBlankState(), action) {
	switch (action.type) {
		case 'OPEN_SLIDE_BG_PANEL':
			return Object.assign({}, state, {panelOpen: !state.panelOpen}, {initial: action.currentSettings});

		case 'CLOSE_SLIDE_BG_PANEL':
			return Object.assign({}, state, getBlankState(), {new: {}}, {initial: {}});

		case 'SET_SLIDE_BG_IMAGE':
			return Object.assign({}, state, {new: {'background-image': action.path}});

		case 'SET_SLIDE_BG_VIDEO':
			return Object.assign({}, state, {new: {'background-video': action.path}});

		default:
			return state;
	}
}
