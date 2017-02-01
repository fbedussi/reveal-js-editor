import md from '../utils/mdConverter';

export default function main(state = {
	md: '',
	selectionStart: 0,
	selectionEnd: 0,
	insert: null,
	html: ''
}, action) {
	switch (action.type) {
		case 'MD_EDITED':
			return Object.assign({}, state, {
				md: action.payload.value,
				html: md.render(action.payload.value),
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
				insert: {text: action.text, pattern: action.pattern}
			});

		default:
			return state;
	}
}
