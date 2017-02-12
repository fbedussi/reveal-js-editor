import md from '../utils/mdConverter';

export default function editor(state = {
	md: '',
	selectionStart: 0,
	selectionEnd: 0,
	insert: null,
	html: ''
}, action) {
	switch (action.type) {
		case 'MD_CHANGED':
			return Object.assign({}, state, {
				md: action.md,
				html: md.render(action.md),
				insert: null
			});

		case 'EDITOR_POS_CHANGED':
		console.log('pos', action.payload.selectionEnd);
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
