const express = require('express');

const authenticate = require('../../../utils/authenticate');
const controller = require('./controller');

const router = express.Router();

router.post('/add', authenticate, controller.add);
router.post('/select', authenticate, controller.select);
router.post('/refresh', authenticate, controller.refresh);

module.exports = router;
