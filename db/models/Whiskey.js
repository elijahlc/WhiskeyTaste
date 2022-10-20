const conn = require('..');
const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, INTEGER, DECIMAL, ENUM } = Sequelize;

const Whiskey = conn.define('whiskey', {
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
				msg: 'Whiskey must have a name',
			},
		},
	},
	barrel_cask: {
		type: STRING,
	},
	age: {
		type: INTEGER,
	},
	price: {
		type: DECIMAL(6, 2),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter the price of this whiskey',
			},
		},
	},
	abv: {
		type: DECIMAL(4, 2),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter the ABV of this whiskey',
			},
		},
	},
	type: {
		type: ENUM(
			'Bourbon',
			'Rye',
			'Tennessee',
			'Scotch',
			'Irish',
			'Blended',
			'Japanese',
			'Canadian',
			'Single Malt'
		),
		validate: {
			isIn: {
				args: [
					[
						'Bourbon',
						'Rye',
						'Tennessee',
						'Scotch',
						'Irish',
						'Blended',
						'Japanese',
						'Canadian',
						'Single Malt',
					],
				],
				msg: 'Whiskey must be a valid type',
			},
		},
	},
});

module.exports = Whiskey;
