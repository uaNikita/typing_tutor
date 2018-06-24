const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/mode', authenticate, controller.mode);
router.post('/fingers', authenticate, controller.fingers);
router.post('/free', authenticate, controller.free);

module.exports = router;
