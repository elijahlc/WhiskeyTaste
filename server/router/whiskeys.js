const express = require('express');
const router = express.Router();
const { User, Whiskey, Distillery, Tasting } = require('../../db/associations');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
	try {
		res.send(await Whiskey.findAll({ include: [Distillery] }));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
