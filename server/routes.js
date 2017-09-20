let express = require('express');
const config = require('config');
const expressJwt = require('express-jwt');
let passport = require('passport');

let user = require('./controllers/user');

const router = express.Router();
const authenticate = expressJwt({
  secret: config.get('secretKey'),
});

router.post('/check-email', user.checkEmail);

router.post('/signup', user.register);

router.post('/login', passport.authenticate('local'), user.login);

router.get('/logout', authenticate, user.logout);

router.post('/tokens', user.getTokens);

router.post('/user', authenticate, user.getUserData);

router.post('/protected-route', authenticate, user.getTokens);

module.exports = router;