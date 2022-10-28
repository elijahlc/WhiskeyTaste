import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import axios from 'axios';
import './App.css';

const App = () => {
	const navigate = useNavigate();

	const [auth, setAuth] = useState(false);

	const login = async (credentials) => {
		try {
			const response = await axios.post('/api/auth', credentials);
			window.localStorage.setItem('token', response.data);
			attemptTokenLogin();
		} catch (err) {
			console.log(err);
		}
	};

	const logout = () => {
		window.localStorage.removeItem('token');
		setAuth(false);
	};

	const attemptTokenLogin = async () => {
		const token = window.localStorage.getItem('token');

		if (token) {
			const response = await axios.get('/api/auth', {
				headers: { authorization: token },
			});
			setAuth(true);
		}
	};

	useEffect(() => {
		attemptTokenLogin();
	}, []);

	return (
		<div className="App">
			<nav>
				<Link to="/">Whiskey🥃Taste</Link>
				<div>
					<Link to="/distilleries">Distilleries</Link>
					<Link to="/whiskeys">Whiskeys</Link>
				</div>
				{auth ? (
					<button onClick={logout}>Log out</button>
				) : (
					<button onClick={() => navigate('/login')}>Sign in</button>
				)}
			</nav>

			<Routes>
				<Route path="/register" element={<Register login={login} />} />
				<Route path="/login" element={<Login login={login} />} />
			</Routes>
		</div>
	);
};

export default App;
