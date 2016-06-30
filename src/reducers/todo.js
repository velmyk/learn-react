const todo = (state = 0, action) => {
	switch (action.type) {
	case 'ADD_TODO':
		return {
			text: action.text,
			id: action.id,
			completed: false
		};
	case 'TOGGLE_TODO':
		return action.id !== state.id
			? state
			: {
				...state,
				completed: !state.completed
			};
	default:
		return state;
	};
};

export default todo;