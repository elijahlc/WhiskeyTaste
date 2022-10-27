const app = require('./app');
const { seed } = require('../db/seed');

const init = async () => {
	try {
		await seed();
	} catch (err) {
		console.log(err);
	}

	const port = process.env.PORT || 3000;

	app.listen(port, () => console.log(`app listening on port ${port}`));
};

init();
