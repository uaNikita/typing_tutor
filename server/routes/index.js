let express = require('express');
const config = require('config');
const expressJwt = require('express-jwt');
let passport = require('passport');

let { create, login, logout, getTokens } = require('../controllers/user');

const router = express.Router();
const authenticate = expressJwt({
  secret: config.get('secretKey'),
});

router.post('/signup', create);

router.post('/login', passport.authenticate('local'), login);

router.get('/logout', authenticate, logout);

router.post('/tokens', getTokens);

router.post('/protected-route', authenticate, getTokens);

module.exports = router;