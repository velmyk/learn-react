import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const ListByFilter = combineReducers({
	all: createList('all'),
	active: createList('active'),
	completed: createList('completed')
});

const todos = combineReducers({
	ListByFilter,
	byId
});

export default todos;

const getAllTodos = state =>
	state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (
	state,
	filter
) => {
	const ids = fromList.getIds(state.ListByFilter[filter]);
	return ids.map(id => fromById.getTodo(state.byId, id));
};