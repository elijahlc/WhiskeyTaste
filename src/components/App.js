import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Register from './Register';

const App = () => {
	return (
		<div>
			<nav>
				<Link to="/register">Register</Link>
			</nav>

			<Routes>
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
};

export default App;
