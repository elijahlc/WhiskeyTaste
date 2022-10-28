import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Register = ({ login }) => {
	const navigate = useNavigate();

	const [details, setDetails] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const createAndLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('/api/users', details);
			await login({
				email: details.email,
				password: details.password,
			});
			setDetails({ firstName: '', lastName: '', email: '', password: '' });
			navigate('/');
		} catch (err) {
			console.log(err);
		}
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
							onChange={(e) => {
								setDetails({ ...details, firstName: e.target.value });
							}}
							value={details.firstName}
						/>
					</div>
					<div className="LoginRegister-Horizontal">
						<label htmlFor="lastName">Last name</label>
						<input
							type="text"
							id="lastName"
							onChange={(e) => {
								setDetails({ ...details, lastName: e.target.value });
							}}
							value={details.lastName}
						/>
					</div>
				</div>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					onChange={(e) => {
						setDetails({ ...details, email: e.target.value });
					}}
					value={details.email}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					onChange={(e) => {
						setDetails({ ...details, password: e.target.value });
					}}
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
