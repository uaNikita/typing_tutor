const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use('/auth', require('./auth'));

router.use('/profile', passport.authenticate('jwt', { session: false }), require('./profile'));

router.use('/text', passport.authenticate('jwt', { session: false }), require('./modes/text'));

module.exports = router;
