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

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));
		default:
			return state;
	};
};

export default todos;