import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const auth = (state = {}, action) => {
	if (action.type === 'auth/set') {
		return action.auth;
	}

	return state;
};

export const logout = () => {
	window.localStorage.removeItem('token');
	return { type: 'auth/set', auth: {} };
};

export const loginWithToken = () => {
	return async (dispatch) => {
		const token = window.localStorage.getItem('token');

		if (token) {
			const response = await axios.get('/api/auth', {
				headers: {
					authorization: token,
				},
			});
			const { id } = response.data;

			dispatch({ type: 'auth/set', auth: { id } });
		}
	};
};

export const attemptLogin = (credentials) => {
	return async (dispatch) => {
		const response = await axios.post('/api/auth', credentials);
		window.localStorage.setItem('token', response.data);
		dispatch(loginWithToken());
	};
};

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
	auth,
	distilleries,
	whiskeys,
	tastings,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
