import { v4 } from 'node-uuid';

// export const setVisibilityFilter = filter => ({
// 	type: 'SET_VISIBILITY_FILTER',
// 	filter
// });

export const toggleTodo = id => ({
	type: 'TOGGLE_TODO',
	id
});

export const addTodo = text => ({
	type: 'ADD_TODO',
	text: text,
	id: v4()
});