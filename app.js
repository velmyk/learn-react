const { combineReducers, createStore } = Redux;
const { Component } = React;
const { Provider, connect } = ReactRedux;

const setVisibilityFilter = filter => ({
	type: 'SET_VISIBILITY_FILTER',
	filter
});

const toggleTodo = id => ({
	type: 'TOGGLE_TODO',
	id
});

let nextTodoId = 0;

const addTodo = text => ({
	type: 'ADD_TODO',
	text: text,
	id: nextTodoId++
});

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

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	};
};

const Todo = ({
	onClick,
	completed,
	text
}) => (
	<li
		onClick={onClick}
		style={{
			textDecoration: completed
				? 'line-through'
				: 'none'
		}}>
		{text}
	</li>
);

const TodoList = ({
	todos,
	onTodoClick
}) => (
	<ul>
		{todos.map(todo => 
			<Todo
				key={todo.id}
				{...todo}
				onClick={() => onTodoClick(todo.id)}
			/>
		)}
	</ul>
);

let AddTodo = ({ dispatch }) => {
	let input;

	return (
		<div>
			<input ref={node => input = node}/>
			<button onClick={() => {
				dispatch(addTodo(input.value));
				input.value = '';
			}}>
				Add Todo
			</button>
		</div>
	);
};

AddTodo = connect()(AddTodo);

const getVisibleTodos = (
	todos,
	filter
) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
	}
};

const Footer = () => (
	<p>
		Show:
		{' '}
		<FilterLink filter='SHOW_ALL'>
			All
		</FilterLink>
		{' '}
		<FilterLink filter='SHOW_ACTIVE' >
			Active
		</FilterLink>
		{' '}
		<FilterLink filter='SHOW_COMPLETED' >
			Completed
		</FilterLink>
	</p>
);

const Link = ({
	active,
	children,
	onClick
}) => {
	if (active) {
		return <span>{children}</span>
	}
	return (
		<a href='#'
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
			{children}
		</a>
	);
};

const mapStateToLinkProps = (state, ownProps) => ({
	active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
	onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});

const FilterLink = connect(
	mapStateToLinkProps,
	mapDispatchToLinkProps
)(Link);

FilterLink.contextTypes = {
	store: React.PropTypes.object
};

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

const mapStateToTodoListProps = state => ({
	todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToTodoListProps = dispatch => ({
	onTodoClick: id => dispatch(toggleTodo(id))
});

const VisibleTodoList = connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);

const TodoApp = ({
	todos,
	visibilityFilter
}) => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer />
	</div>
);

ReactDOM.render(
	<Provider store={createStore(todoApp)}>
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);