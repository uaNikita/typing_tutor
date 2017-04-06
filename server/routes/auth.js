let express = require('express');
let passport = require('passport');
let userCtrl = require('../controllers/user');

const router = express.Router();






router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
   res.json('good');
});

router.post('/signup', userCtrl.create);

router.get('/logout', (req, res) => {

   req.logout();

   return res.json('ok');

});

module.exports = router;
