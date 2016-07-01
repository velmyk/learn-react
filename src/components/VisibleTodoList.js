import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

class VisibleTodoList extends Component {
	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}

	fetchData() {
		const { filter, fetchTodos } = this.props;
		fetchTodos(filter);
	}

	render() {
		const { toggleTodo, todos, errorMessage, isFetching } = this.props;

		if (isFetching && !todos.length) {
			return <p>Loading...</p>;
		}

		if (errorMessage && !todos.length) {
			return (
				<FetchError
					message={errorMessage}
					onRetry={() => this.fetchData()}
				/>
			);
		}

		return (
			<TodoList
				todos={todos}
				onTodoClick={toggleTodo}
			/>
		);
	}
}

const mapStateToTodoListProps = (state, { params }) => {
	const filter = params.filter || 'all';
	return {
		todos: getVisibleTodos(state, filter),
		errorMessage: getErrorMessage(state, filter),
		isFetching: getIsFetching(state, filter),
		filter
	};
};

VisibleTodoList = withRouter(connect(
	mapStateToTodoListProps,
	actions
)(VisibleTodoList));

export default VisibleTodoList;

