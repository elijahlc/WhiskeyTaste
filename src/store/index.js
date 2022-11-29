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
			const { id, email, firstName, lastName } = response.data;

			dispatch({ type: 'auth/set', auth: { id, email, firstName, lastName } });
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
	if (action.type === 'distilleries/set') {
		return action.distilleries;
	}

	return state;
};

export const fetchDistilleries = () => {
	return async (dispatch) => {
		const response = await axios.get('/api/distilleries/');
		dispatch({ type: 'distilleries/set', distilleries: response.data });
	};
};

const whiskeys = (state = [], action) => {
	if (action.type === 'whiskeys/set') {
		return action.whiskeys;
	}

	return state;
};

export const fetchWhiskeys = () => {
	return async (dispatch) => {
		const response = await axios.get('/api/whiskeys/');
		dispatch({ type: 'whiskeys/set', whiskeys: response.data });
	};
};

const tastings = (state = [], action) => {
	if (action.type === 'tastings/set') {
		return action.tastings;
	}
	return state;
};

export const fetchTastings = (id) => {
	return async (dispatch) => {
		const response = await axios.get(`/api/tastings/${id}`);
		dispatch({ type: 'tastings/set', tastings: response.data });
	};
};

const reducer = combineReducers({
	auth,
	distilleries,
	whiskeys,
	tastings,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
