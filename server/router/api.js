const express = require('express');
const router = express.Router();
const { User } = require('../../db/associations');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/auth', async (req, res, next) => {
	try {
		res.send(await User.authenticate(req.body));
	} catch (err) {
		next(err);
	}
});

router.get('/auth', async (req, res, next) => {
	try {
		res.send(await User.findByToken(req.headers.authorization));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
