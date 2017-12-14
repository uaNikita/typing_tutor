const express = require('express');

const authenticate = require('../utils/authenticate');
const text = require('../controllers/modes/text');

const router = express.Router();

router.post('/add', authenticate, text.add);

module.exports = router;