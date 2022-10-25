const conn = require('../db');
const app = require('./app');
const seed = require('../db/seed');

async function init() {
	try {
		await conn.sync({ force: true });
		await seed();
	} catch (err) {
		console.log(err);
	}

	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`app listening on port ${port}`));
}

init();