const conn = require('.');
const { Distillery, Whiskey, User, Tasting } = require('./associations');

const seed = async () => {
	await conn.sync({ force: true });

	const batsonRiver = await Distillery.create({
		name: 'Batson River',
	});

	const langsfordRoad = await Whiskey.create({
		name: 'Langsford Road',
		price: 34.99,
		abv: 44,
		type: 'Bourbon',
		distilleryId: batsonRiver.id,
	});

	const eli = await User.create({
		email: 'ecohen3@wellesley.edu',
		password: 'monkey',
		firstName: 'Eli',
		lastName: 'Cohen',
	});

	const tasting = await Tasting.create({
		whiskeyId: langsfordRoad.id,
		userId: eli.id,
		date: '2019-05-28',
		glass: 'Tumbler',
		served: 'Neat',
		rating: 7,
		oaky: true,
		creamy: true,
		warm: true,
		youthful: true,
		sweet: true,
	});

	return { batsonRiver, langsfordRoad, eli, tasting };
};

module.exports = { seed };
