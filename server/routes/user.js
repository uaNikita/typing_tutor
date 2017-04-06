let express = require('express');
let passport = require('passport');
let userCtrl = require('../controllers/user');

const router = express.Router();

router.route('/')
  .get(userCtrl.get)

router.route('/text-mode')
  .get(userCtrl.getTextMode)
  .put(userCtrl.updateTextMode);

router.route('/learning-mode')
  .get(userCtrl.getLearningMode)
  .put(userCtrl.updateLearningMode);

router.route('/statistic')
  .get(userCtrl.getStatistic)
  .put(userCtrl.updateStatistic);

module.exports = router;