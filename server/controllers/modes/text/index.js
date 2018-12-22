const express = require('express');
const passport = require('passport');

const controller = require('./controller');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/', authenticate, controller.add);
router.patch('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.del);
router.post('/refresh/:id', authenticate, controller.refresh);
router.post('/select/:id', authenticate, controller.select);
router.post('/type', authenticate, controller.type);

module.exports = router;
