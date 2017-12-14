let express = require('express');

const authenticate = require('../utils/authenticate');
let user = require('../controllers/user');

const router = express.Router();

router.use('/auth', require('./auth'));

router.use('/text', require('./text'));

router.post('/user', authenticate, user.getUserData);

module.exports = router;