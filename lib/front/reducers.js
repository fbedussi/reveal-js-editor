function reducer(state = {
	md: ''
}, action) {
	switch (action.type) {
		case 'OPEN_FILE':
			return Object.assign({}, state, {
				md: action.content
			});
		default:
			return state;
	}
}

export default reducer;
