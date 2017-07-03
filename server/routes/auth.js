let express = require('express');
let passport = require('passport');
let userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
   res.json('good');
});

router.post('/signup', userCtrl.create);

router.post('/token', userCtrl.createNewTokens);

router.get('/logout', (req, res) => {

   req.logout();

   return res.json('ok');

});

module.exports = router;
