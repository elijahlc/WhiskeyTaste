import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const distilleries = (state = [], action) => {
	return state;
};

const whiskeys = (state = [], action) => {
	return state;
};

const tastings = (state = [], action) => {
	return state;
};

const reducer = combineReducers({
	distilleries,
	whiskeys,
	tastings,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
