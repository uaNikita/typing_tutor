const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();

router.post('/check-email', controller.checkEmail);

router.post('/signup', controller.signUp);

router.post('/verify-email', controller.verifyEmail);

router.post('/restore-access', controller.restoreAccess);

router.post('/verify-token', controller.verifyToken);

router.post('/login', passport.authenticate('local'), controller.login);

router.get('/logout', passport.authenticate('jwt', { session: false }), controller.logout);

router.post('/tokens', passport.authenticate('jwt', { session: false }), controller.getTokens);

module.exports = router;
