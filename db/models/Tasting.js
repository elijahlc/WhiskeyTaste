const conn = require('..');
const Sequelize = require('sequelize');
const { UUID, UUIDV4, ENUM, TEXT, DATEONLY, INTEGER, BOOLEAN } = Sequelize;

const Tasting = conn.define('tasting', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	date: {
		type: DATEONLY,
		allowNull: false,
		validate: {
			isDate: {
				msg: 'Please enter a valid date',
			},
			//add validation for before or on current day
		},
	},
	glass: {
		type: ENUM(
			'Glencairn',
			'Neat',
			'Tulip',
			'Norlan',
			'Tumbler',
			'Snifter',
			'Vinum',
			'Swirling',
			'Other'
		),
		allowNull: false,
		validate: {
			isIn: {
				args: [
					[
						'Glencairn',
						'Neat',
						'Tulip',
						'Norlan',
						'Tumbler',
						'Snifter',
						'Vinum',
						'Swirling',
						'Other',
					],
				],
				msg: 'Please log the glass you used for this tasting',
			},
		},
	},
	served: {
		type: ENUM('Neat', 'On the rocks'),
		allowNull: false,
		validate: {
			isIn: {
				args: [['Neat', 'On the rocks']],
				msg: 'Please log how you served this whiskey',
			},
		},
	},
	rating: {
		type: INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 10,
		},
	},
	cerealy: {
		type: BOOLEAN,
	},
	herbal: {
		type: BOOLEAN,
	},
	oaky: {
		type: BOOLEAN,
	},
	peppery: {
		type: BOOLEAN,
	},
	winey: {
		type: BOOLEAN,
	},
	dignified: {
		type: BOOLEAN,
	},
	creamy: {
		type: BOOLEAN,
	},
	warm: {
		type: BOOLEAN,
	},
	citrusy: {
		type: BOOLEAN,
	},
	smokey: {
		type: BOOLEAN,
	},
	floral: {
		type: BOOLEAN,
	},
	youthful: {
		type: BOOLEAN,
	},
	grassy: {
		type: BOOLEAN,
	},
	malty: {
		type: BOOLEAN,
	},
	peaty: {
		type: BOOLEAN,
	},
	spicy: {
		type: BOOLEAN,
	},
	spirity: {
		type: BOOLEAN,
	},
	dry: {
		type: BOOLEAN,
	},
	harsh: {
		type: BOOLEAN,
	},
	nutty: {
		type: BOOLEAN,
	},
	salty: {
		type: BOOLEAN,
	},
	woody: {
		type: BOOLEAN,
	},
	tarry: {
		type: BOOLEAN,
	},
	sweet: {
		type: BOOLEAN,
	},
});

module.exports = Tasting;
