import React, { useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, logout } from '../store';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Tastings from './Tastings';
import './App.css';

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { auth } = useSelector((state) => state);

	useEffect(() => {
		dispatch(loginWithToken());
	}, []);

	return (
		<div className="App">
			<nav>
				<Link to="/">🥃WhiskeyTaste</Link>
				<div>
					<Link to="/tastings">My Tastings</Link>
					<Link to="/distilleries">Distilleries</Link>
					<Link to="/whiskeys">Whiskeys</Link>
				</div>
				{auth.id ? (
					<span>
						<button onClick={() => dispatch(logout())}>Log out</button>
					</span>
				) : (
					<span>
						<button onClick={() => navigate('/login')}>
							Sign in <i className="fa-solid fa-angle-right"></i>
						</button>
					</span>
				)}
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/tastings" element={<Tastings />} />
			</Routes>
		</div>
	);
};

export default App;
