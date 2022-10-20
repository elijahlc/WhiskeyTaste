const Sequelize = require('sequelize');

const conn = new Sequelize(
	process.env.DATABASE_URL || 'postgres:localhost/whiskeytaste_db'
);

module.exports = conn;
