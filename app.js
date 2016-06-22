const { combineReducers, createStore } = Redux;
const { Component } = React;

const todo = (state = 0, action) => {
	switch (action.type) {
	case 'ADD_TODO':
		return {
			text: action.text,
			id: action.id,
			completed: false
		};
	case 'TOGGLE_TODO':
		return {
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

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY':
			return action.filter;
		default:
			return state;
	};
};

let nextTodoId = 0;

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

const store = createStore(todoApp);

class TodoApp extends Component {
	render() {
		return (
			<div>
				<button onClick={() => {
					store.dispatch({
						type: 'ADD_TODO',
						text: 'Test',
						id: nextTodoId++
					});
				}}>
					Add Todo
				</button>
				<ul>
					{this.props.todos.map(todo => 
						<li key={todo.id}>
							{todo.text}
						</li>
					)}
				</ul>
			</div>
		);
	}
}

const render = () => {
	ReactDOM.render(
		<TodoApp todos={store.getState().todos} />,
		document.getElementById('root')
	);
};

store.subscribe(render);
render();