let express = require('express');
let passport = require('passport');

let user = require('../controllers/user');

const router = express.Router();
const authenticate = require('../utils/authenticate');

router.post('/check-email', user.checkEmail);

router.post('/signup', user.register);

router.post('/verify-email', user.verifyEmail);

router.post('/restore-access', user.restoreAccess);

router.post('/verify-token', user.verifyToken);

router.post('/login', passport.authenticate('local'), user.login);

router.get('/logout', authenticate, user.logout);

router.post('/tokens', authenticate, user.getTokens);

module.exports = router;