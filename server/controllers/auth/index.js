const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/check-email', controller.checkEmail);
router.post('/signup', controller.signUp);
router.post('/verify-email', controller.verifyEmail);
router.post('/restore-access', controller.restoreAccess);
router.post('/verify-token', controller.verifyToken);
router.post('/login', passport.authenticate('local'), controller.login);
router.post('/logout', authenticate, controller.logout);
router.post('/tokens', controller.getTokens);

module.exports = router;
