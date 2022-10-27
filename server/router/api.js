const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/distilleries', require('./distilleries'));
router.use('/tastings', require('./tastings'));
router.use('/users', require('./users'));
router.use('/whiskeys', require('./whiskeys'));

module.exports = router;
