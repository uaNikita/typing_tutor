let express = require('express');

const authenticate = require('../utils/authenticate');
let user = require('../controllers/user');

const router = express.Router();

router.use('/auth', require('./auth'));

router.post('/user', authenticate, user.getUserData);

router.post('/protected-route', authenticate, user.getTokens);

module.exports = router;