const express = require('express');
const router = express.Router();
const { User, Whiskey, Distillery, Tasting } = require('../../db/associations');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
	try {
		res.send(await Tasting.findAll());
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		res.send(await Tasting.findAll({ where: { userId: req.params.id } }));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
