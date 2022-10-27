import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
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
			console.log(response.data);
			setDetails({ firstName: '', lastName: '', email: '', password: '' });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Link to="/">Go home</Link>
			<form onSubmit={createAndLogin}>
				<h1>Create your WhiskeyTaste account </h1>
				<div>
					<label htmlFor="firstName">First name</label>
					<input
						type="text"
						id="firstName"
						onChange={(e) => {
							setDetails({ ...details, firstName: e.target.value });
						}}
						value={details.firstName}
					/>
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
				<div>
					Have an account? <Link>Sign in</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;
