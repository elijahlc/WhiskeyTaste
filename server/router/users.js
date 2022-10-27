const express = require('express');
const router = express.Router();
const { User } = require('../../db/associations');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);
		res.send(newUser);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
