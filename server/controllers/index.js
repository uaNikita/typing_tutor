let express = require('express');

const authenticate = require('../utils/authenticate');

const router = express.Router();

router.use('/auth', require('./auth'));

router.use('/profile', require('./profile'));

router.use('/text', require('./modes/text'));

module.exports = router;