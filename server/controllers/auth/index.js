const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();
const authenticate = require('../../utils/authenticate');

router.post('/check-email', controller.checkEmail);

router.post('/signup', controller.register);

router.post('/verify-email', controller.verifyEmail);

router.post('/restore-access', controller.restoreAccess);

router.post('/verify-token', controller.verifyToken);

router.post('/login', passport.authenticate('local'), controller.login);

router.get('/logout', authenticate, controller.logout);

router.post('/tokens', authenticate, controller.getTokens);

module.exports = router;
