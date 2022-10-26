const conn = require('..');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

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

User.addHook('beforeSave', async (user) => {
	if (user.changed('password'))
		user.password = await bcrypt.hash(user.password, 12);
});

module.exports = User;
