const express = require('express');

const authenticate = require('../utils/authenticate');
const profile = require('../controllers/profile');

const router = express.Router();

router.post('/change-password', authenticate, profile.changePassword);

module.exports = router;