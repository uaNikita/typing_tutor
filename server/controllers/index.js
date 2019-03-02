const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/text', require('./modes/text'));
router.use('/syllable', require('./modes/syllable'));

require('./modes/race');

module.exports = router;
