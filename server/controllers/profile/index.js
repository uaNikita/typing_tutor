const express = require('express');
const passport = require('passport');

const controller = require('./controller');
const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/', authenticate, controller.getAllData);
router.post('/mode', authenticate, controller.setMode);
router.post('/change-password', authenticate, controller.changePassword);
router.post('/statistic', authenticate, controller.statistic);
router.post('/delete', authenticate, controller.deleteAccount);

module.exports = router;
