const express = require('express');
const passport = require('passport');

const controller = require('./controller');
const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/mode', authenticate);
router.post('/fingers', authenticate, controller.select);
router.post('/free', authenticate, controller.refresh);

module.exports = router;
