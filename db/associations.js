const Distillery = require('./models/Distillery');
const Whiskey = require('./models/Whiskey');
const User = require('./models/User');
const Tasting = require('./models/Tasting');

Whiskey.belongsTo(Distillery);
Distillery.hasMany(Whiskey);
Tasting.belongsTo(Whiskey);
Whiskey.hasMany(Tasting);
Tasting.belongsTo(User);
User.hasMany(Tasting);

module.exports = {
	Distillery,
	Whiskey,
	User,
	Tasting,
};
