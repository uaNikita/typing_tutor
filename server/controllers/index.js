const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/text', require('./modes/text'));
router.use('/learning', require('./modes/learning'));

module.exports = router;
