function getClearNotification() {
	return {
		openFileRequest: false,
		openFileSuccess: false,
		openFileError: false,
		saveProjectRequest: false,
		saveProjectSuccess: false,
		saveProjectError: false,
		exportMedia: true,
		saveMdRequest: false,
		saveMdSuccess: false,
		saveMdError: false,
		saveHtmlRequest: false,
		saveHtmlSuccess: false,
		saveHtmlError: false,
		copyToClipBoard: false
	}
}

export default function file(state = Object.assign({
	currentFileName: '',
	recentFiles: [],
	mediaFiles: []
}, getClearNotification()), action) {
	switch (action.type) {
		case 'OPEN_FILE_REQUEST':
			return Object.assign({}, state, {
				openFileRequest: true
			});

		case 'OPEN_FILE_SUCCESS':
			return Object.assign({}, state, {
				currentFileName: action.fileName,
				recentFiles: state.recentFiles.concat(action.fileName),
				openFileRequest: false,
				openFileSuccess: true
			});

		case 'OPEN_FILE_ERROR':
			return Object.assign({}, state, {
				openFileRequest: false,
				openFileError: false
			});

		case 'OPEN_FILE_ABORTED':
			return Object.assign({}, state, {
				openFileRequest: false
			});

		case 'SET_RECENT_FILES':
			return Object.assign({}, state, {
				recentFiles: action.recentFiles
			});

		case 'SAVE_PROJECT_REQUEST':
			return Object.assign({}, state, {
				saveProjectRequest: true,
			});

		case 'SAVE_PROJECT_SUCCESS':
			return Object.assign({}, state, {
				saveProjectRequest: false,
				saveProjectSuccess: true
			});

		case 'SAVE_PROJECT_ERROR':
			return Object.assign({}, state, {
				saveProjectRequest: false,
				saveProjectError: true
			});

		case 'SAVE_MD_REQUEST':
			return Object.assign({}, state, {
				saveMdRequest: true
			});

		case 'SAVE_MD_SUCCESS':
			return Object.assign({}, state, {
				saveMdRequest: false,
				saveMdSuccess: true
			});

		case 'SAVE_MD_ERROR':
			return Object.assign({}, state, {
				saveMdRequest: false,
				saveMdError: true
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
				saveHtmlRequest: false,
				saveHtmlSuccess: true
			});

		case 'SAVE_HTML_ERROR':
			return Object.assign({}, state, {
				saveHtmlRequest: false,
				saveHtmlError: true
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

		case 'CLEAR_NOTIFICATIONS':
			return Object.assign({}, state, getClearNotification());

		default:
			return state;
	}
}
