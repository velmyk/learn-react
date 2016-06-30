import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import TodoApp from './TodoApp';
import { fetchTodos } from '../api';

fetchTodos('all')
	.then(todos => console.log(todos));

const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/(:filter)' component={TodoApp} />
		</Router>
	</Provider>
);

export default Root;