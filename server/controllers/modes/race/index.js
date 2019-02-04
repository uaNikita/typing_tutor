const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', authenticate, controller.get);

// Sockets
require('./socket');

module.exports = router;
