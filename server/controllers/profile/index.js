const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.post('', controller.getAllData);

router.post('/mode', controller.setMode);

router.post('/change-password', controller.changePassword);

router.post('/statistic', controller.statistic);

router.post('/delete', controller.deleteAccount);

module.exports = router;
