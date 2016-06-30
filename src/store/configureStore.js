import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from '../reducers';
// import { loadState, saveState } from '../utilities/localStorage';
// import throttle from 'lodash/throttle';

// const logger = store => {
// 	return next => {

// 		if(!console.group) {
// 			return next;
// 		}

// 		return action => {
// 			console.group(action.type);
// 			console.log('%c prev state', 'color: gray', store.getState());
// 			console.log('%c action', 'color: blue', action);
// 			const returnValue = next(action);
// 			console.log('%c next state', 'color: green', store.getState());
// 			console.groupEnd(action.type);
// 			return returnValue;
// 		};
// 	}
// };

// const promise = store =>
// 	next =>
// 		action => {
// 			if (typeof action.then === 'function') {
// 				return action.then(next);
// 			}
// 			return next(action);
// 		};

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
// 	middlewares.slice().reverse().forEach(middleware => 
// 		store.dispatch = middleware(store)(store.dispatch)
// 	);
// };

const configureStore = () => {
	// const persistedState = loadState();

	// const store = createStore(todoApp);
	const middlewares = [promise];

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
		// middlewares.push(logger);
	}

	// store.subscribe(throttle(() => {
	// 	saveState({
	// 		todos: store.getState().todos
	// 	});
	// }, 1000));

	// wrapDispatchWithMiddlewares(store, middlewares);

	// return store;
	return createStore(
		todoApp,
		applyMiddleware(...middlewares)
	);
};

export default configureStore;