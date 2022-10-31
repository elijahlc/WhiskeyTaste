import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './App.css';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [details, setDetails] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const onChange = (e) => {
		setDetails({ ...details, [e.target.name]: e.target.value });
	};

	const createAndLogin = async (e) => {
		e.preventDefault();

		await axios.post('/api/users', details);
		dispatch(
			attemptLogin({ email: details.email, password: details.password })
		);
		setDetails({ firstName: '', lastName: '', email: '', password: '' });
		navigate('/');
	};

	return (
		<div className="LoginRegister">
			<form onSubmit={createAndLogin}>
				<h1>Create your WhiskeyTaste account </h1>
				<div className="LoginRegister-HorizontalContainer">
					<div className="LoginRegister-Horizontal">
						<label htmlFor="firstName">First name</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							onChange={onChange}
							value={details.firstName}
						/>
					</div>
					<div className="LoginRegister-Horizontal">
						<label htmlFor="lastName">Last name</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							onChange={onChange}
							value={details.lastName}
						/>
					</div>
				</div>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					name="email"
					onChange={onChange}
					value={details.email}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={onChange}
					value={details.password}
				/>
				<button>Create account</button>
			</form>
			<div className="LoginRegister-Reroute">
				Have an account? <Link to="/login">Sign in</Link>
			</div>
		</div>
	);
};

export default Register;
