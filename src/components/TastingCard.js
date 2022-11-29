import React from 'react';

const TastingCard = ({
	date,
	rating,
	whiskey,
	distillery,
	glass,
	served,
	qualities,
}) => {
	return (
		<div>
			<h1>
				{whiskey} by {distillery} tasted on {date}
			</h1>
		</div>
	);
};

export default TastingCard;
