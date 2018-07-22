const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/', authenticate, controller.add);
router.patch('/:id', authenticate, controller.update);
router.post('/:id/select', authenticate, controller.select);
router.post('/refresh', authenticate, controller.refresh);
router.post('/type', authenticate, controller.type);

module.exports = router;
