import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTastings, fetchWhiskeys, fetchDistilleries } from '../store';
import TastingCard from './TastingCard';

import './App.css';

const Tastings = () => {
	const dispatch = useDispatch();

	const { auth, tastings, distilleries, whiskeys } = useSelector(
		(state) => state
	);

	useEffect(() => {
		if (auth.id) {
			dispatch(fetchTastings(auth.id));

			dispatch(fetchWhiskeys());
			dispatch(fetchDistilleries());

			tastings.forEach((tasting) => {
				tasting.qualities = [];

				tasting.whiskey = whiskeys.find(
					(whiskey) => whiskey.id === tasting.whiskeyId
				);
				tasting.whiskeyDistillery = distilleries.find(
					(distillery) => distillery.id === tasting.whiskey.distilleryId
				);

				for (let key in tasting) {
					if (tasting[key] === true) tasting.qualities.push(key);
				}
			});
		}
	}, []);

	return (
		<div>
			{tastings.map((tasting) => {
				return (
					<TastingCard
						date={tasting.date}
						rating={tasting.rating}
						glass={tasting.glass}
						served={tasting.served}
					/>
				);
			})}
		</div>
	);
};

export default Tastings;
