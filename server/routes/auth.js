let express = require('express');
let passport = require('passport');
let config = require('config');
let userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/login', passport.authenticate('local'), userCtrl.login);

router.post('/signup', userCtrl.create);

router.post('/token', userCtrl.createNewTokens);

router.get('/logout', (req, res) => {

  req.logout();

  return res.json('ok');

});

module.exports = router;
