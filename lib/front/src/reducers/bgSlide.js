export default function bgSlide(state = {}, action) {
	switch (action.type) {
		case 'OPEN_SLIDE_BG_PANEL':
			return Object.assign({}, state, {initial: action.currentSettings});

		case 'CLOSE_SLIDE_BG_PANEL':
			return Object.assign({}, state, {new: {}, initial: {}});

		case 'SET_SLIDE_BG_IMAGE':
			return Object.assign({}, state, {new: {'background-image': action.path}});

		case 'SET_SLIDE_BG_VIDEO':
			return Object.assign({}, state, {new: {'background-video': action.path}});

		default:
			return state;
	}
}
