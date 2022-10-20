const conn = require('..');
const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;

const User = conn.define('user', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	email: {
		type: STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: 'Your email address is required',
			},
			isEmail: {
				msg: 'Entered email address is not a valid email address',
			},
		},
	},
	password: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a password',
			},
		},
	},
	firstName: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter your first name',
			},
		},
	},
	lastName: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter your last name',
			},
		},
	},
});

module.exports = User;
