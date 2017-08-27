let express = require('express');
const config = require('config');
const expressJwt = require('express-jwt');
let passport = require('passport');

let { login, create, getTokens } = require('../controllers/user');

const router = express.Router();
const authenticate = expressJwt({
  secret: config.get('secretKey'),
});

router.post('/login', passport.authenticate('local'), login);

router.post('/signup', create);

router.get('/logout', (req, res) => {
  req.logout();

  return res.json('ok');
});

router.post('/tokens', authenticate, getTokens);

module.exports = router;