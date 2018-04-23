const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.post('/add', controller.add);
router.post('/select', controller.select);
router.post('/refresh', controller.refresh);
router.post('/type', controller.type);

module.exports = router;
