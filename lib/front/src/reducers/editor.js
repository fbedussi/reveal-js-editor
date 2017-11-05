import md from '../utils/mdConverter';

export default function editor(state = {
	md: '',
	selectionStart: 0,
	selectionEnd: 0,
	insert: null,
	dirty: false,
	html: ''
}, action) {
	switch (action.type) {
		case 'MD_CHANGED':
			return Object.assign({}, state, {
				md: action.md,
				html: md.render(action.md),
				dirty: true,
				insert: null
			});

		case 'MD_LOADED':
			return Object.assign({}, state, {
				md: action.md,
				html: md.render(action.md),
				dirty: false,
				insert: null
			});

		case 'SAVE_PROJECT_SUCCESS':
		case 'SAVE_MD_SUCCESS':
			return Object.assign({}, state, {
				dirty: false
			});

		case 'EDITOR_POS_CHANGED':
			return Object.assign({}, state, {
				selectionStart: action.payload.selectionStart,
				selectionEnd: action.payload.selectionEnd,
			});

		case 'INSERT':
			return Object.assign({}, state, {
				insert: action.stringsToInsert
			});

		default:
			return state;
	}
}
