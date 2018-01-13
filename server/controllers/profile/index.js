const express = require('express');

const authenticate = require('../../utils/authenticate');
const controller = require('./controller');

const router = express.Router();

router.post('', authenticate, controller.getAllData);
router.post('/change-password', authenticate, controller.changePassword);
router.post('/statistic', authenticate, controller.statistic);

module.exports = router;