import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(attemptLogin(credentials));
		navigate('/');
	};

	return (
		<div className="LoginRegister">
			<form onSubmit={onSubmit}>
				<h1>Sign in to your account </h1>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					name="email"
					onChange={onChange}
					value={credentials.email}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={onChange}
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
