let express = require('express');
let authRoutes = require('./auth');
let userRoutes = require('./user');

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/user', userRoutes);

// todo: add token

module.exports = router;