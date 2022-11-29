import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

const Home = () => {
	const { auth } = useSelector((state) => state);

	return (
		<div>
			{auth.id ? (
				<h2>Welcome, {auth.firstName}! </h2>
			) : (
				<h2>Welcome to WhiskeyTaste!</h2>
			)}
		</div>
	);
};

export default Home;
