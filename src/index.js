import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import TodoApp from './components/TodoApp';
import todoApp from './reducers/index';

const persistedState = {
	todos: [{
		id: '0',
		text: 'Welcome back!',
		completed: false
	}]
};

ReactDOM.render(
	<Provider store={createStore(todoApp, persistedState)}>
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);