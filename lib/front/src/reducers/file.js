export default function file(state = {
	currentFileName: '',
	openFileRequest: false,
	saveProjectRequest: false,
	exportMedia: true,
	saveMdRequest: false,
	saveHtmlRequest: false,
	copyToClipBoard: false,
	menuUpdateRequest: false,
	mediaFiles: []
}, action) {
	switch (action.type) {
		case 'OPEN_FILE_REQUEST':
			return Object.assign({}, state, {
				openFileRequest: true
			});

		case 'OPEN_FILE_SUCCESS':
			return Object.assign({}, state, {
				md: action.payload.content,
				selectionStart: 0,
				selectionEnd: 0,
				html: renderMarkdownToHtml(action.payload.content),
				currentFileName: action.payload.fileName,
				openFileRequest: false
			});

		case 'OPEN_FILE_ERROR':
			return Object.assign({}, state, {
				openFileRequest: false
			});

		case 'OPEN_FILE_ABORTED':
			return Object.assign({}, state, {
				openFileRequest: false
			});

		case 'SAVE_PROJECT_REQUEST':
			return Object.assign({}, state, {
				saveProjectRequest: true,
			});

		case 'SAVE_PROJECT_SUCCESS':
			return Object.assign({}, state, {
				saveProjectRequest: false
			});

		case 'SAVE_PROJECT_ERROR':
			return Object.assign({}, state, {
				saveProjectRequest: false
			});

		case 'SAVE_MD_REQUEST':
			return Object.assign({}, state, {
				saveMdRequest: true,
			});

		case 'SAVE_MD_SUCCESS':
			return Object.assign({}, state, {
				saveMdRequest: false
			});

		case 'SAVE_MD_ERROR':
			return Object.assign({}, state, {
				saveMdRequest: false
			});

		case 'SAVE_MD_ABORTED':
			return Object.assign({}, state, {
				saveMdRequest: false
			});

		case 'SAVE_HTML_REQUEST':
			return Object.assign({}, state, {
				saveHtmlRequest: true,
			});

		case 'SAVE_HTML_SUCCESS':
			return Object.assign({}, state, {
				saveHtmlRequest: false
			});

		case 'SAVE_HTML_ERROR':
			return Object.assign({}, state, {
				saveHtmlRequest: false
			});

		case 'SAVE_HTML_ABORTED':
			return Object.assign({}, state, {
				saveHtmlRequest: false
			});

		case 'COPY_TO_CLIPBOARD_START':
			return Object.assign({}, state, {
				copyToClipBoard: true
			});

		case 'COPY_TO_CLIPBOARD_END':
			return Object.assign({}, state, {
				copyToClipBoard: false
			});

		default:
			return state;
	}
}
