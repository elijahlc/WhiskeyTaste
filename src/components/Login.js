import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Login = ({ login }) => {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await login({ email: credentials.email, password: credentials.password });
			setCredentials({ email: '', password: '' });
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="LoginRegister">
			<form onSubmit={onSubmit}>
				<h1>Sign in to your account </h1>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					onChange={(e) => {
						setCredentials({ ...credentials, email: e.target.value });
					}}
					value={credentials.email}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					onChange={(e) => {
						setCredentials({ ...credentials, password: e.target.value });
					}}
					value={credentials.password}
				/>
				<button>Sign in</button>
			</form>
			<div className="LoginRegister-Reroute">
				Don't have an account? <Link to="/register">Sign up</Link>
			</div>
		</div>
	);
};

export default Login;
