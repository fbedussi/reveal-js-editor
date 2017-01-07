import {renderMarkdownToHtml} from './editor.js';

function reducer(state = {
	md: '',
	html: '',
	currentFileName: '',
	openFileRequest: false
}, action) {
	switch (action.type) {
		case 'OPEN_FILE':
			return Object.assign({}, state, {
				md: action.payload.content,
				html: renderMarkdownToHtml(action.payload.content),
				currentFileName: action.payload.fileName,
				openFileRequest: false
			});
		case 'OPEN_FILE_REQUEST':
			return Object.assign({}, state, {
				openFileRequest: true
			});
		default:
			return state;
	}
}

export default reducer;
