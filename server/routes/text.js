const express = require('express');

const authenticate = require('../utils/authenticate');
const text = require('../controllers/modes/text');

const router = express.Router();

router.post('/add', authenticate, text.add);
router.post('/select', authenticate, text.select);
router.post('/refresh', authenticate, text.refresh);

module.exports = router;