import {loadTranslationsSync} from '../../../language';

export default function language(state = {
	currentLanguage: 'en',
	labels: loadTranslationsSync('en'),
}, action) {
	switch (action.type) {
		case 'CHANGE_LANGUAGE':
			return Object.assign({}, state, {
				currentLanguage: action.newLanguageIso,
				labels: loadTranslationsSync(action.newLanguageIso)
			});
		default:
			return state;
	}
}
