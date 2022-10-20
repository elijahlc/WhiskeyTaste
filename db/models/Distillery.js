const conn = require('..');
const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;

const Distillery = conn.define('distillery', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	name: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Distillery must have a name',
			},
		},
	},
});

module.exports = Distillery;
