const _ = require('lodash');
const moment = require('moment');
const httpStatus = require('http-status');

const APIError = require('../../utils/APIError');
const Client = require('../../models/client');
const Statistic = require('../../models/statistic');
const Verification = require('../../models/verification');

const getAllData = (req, res, next) => {
  const {
    user,
  } = req;

  Statistic.find({ user: user.get('id') }).exec()
    .then(statistic => {
      const data = user.toObject();

      if (statistic) {
        data.statistic = statistic;
      }

      res.json(data);
    })
    .catch(e => next(e));
};

const changePassword = (req, res, next) => {
  const {
    user,
    body: {
      old_password: oldPassword,
      new_password: newPassword,
    },
  } = req;

  user.validPassword(oldPassword)
    .then(valid => {
      if (valid) {
        user.set('password', newPassword);

        return user.save();
      }

      throw new APIError({
        message: 'test',
        errors: {
          old_password: 'Incorrect password',
        },
        status: httpStatus.BAD_REQUEST,
      });
    })
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const statistic = (req, res, next) => {
  const {
    user,
    body: {
      keyboard,
      mode,
      sessionId,
      statistic: clientStatistic,
    },
  } = req;

  Statistic
    .findOne({
      user,
      date: moment().startOf('day').toDate(),
    })
    .exec()
    .then(stats => {
      if (stats) {
        const modePath = `${keyboard}.${mode}`;

        if (!stats.get(modePath)) {
          stats.set(modePath, [clientStatistic]);
        }
        else {
          stats.set(`${modePath}.${sessionId}`, clientStatistic);
        }

        return stats.save();
      }

      const newStatistic = {
        user: user.id,
      };

      _.set(newStatistic, `${keyboard}.${mode}`, [clientStatistic]);

      return new Statistic(newStatistic, { strict: false }).save();
    })
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const deleteAccount = (req, res, next) => {
  const {
    user,
    body: {
      confirm_new_password: confirmNewPassword,
    },
  } = req;

  user.validPassword(confirmNewPassword)
    .then(valid => {
      if (valid) {
        const userId = user.get('id');

        return Promise.all([
          Client.find({ user: userId }),
          Statistic.findOne({ user: userId }),
          Verification.find({ user: userId }),
        ]);
      }

      throw new APIError({
        errors: {
          confirm_new_password: 'Incorrect password',
        },
        status: httpStatus.BAD_REQUEST,
      });
    })
    .then(([clients, stats, verifications]) => {
      const modelsForRemoval = [user];

      if (stats) {
        modelsForRemoval.push(stats);
      }

      if (verifications) {
        verifications.forEach(verification =>
          modelsForRemoval.push(verification));
      }

      if (clients) {
        clients.map(client =>
          modelsForRemoval.push(client));
      }

      return Promise.all(modelsForRemoval.map(doc => doc.remove()));
    })
    .then(() =>
      res.json(httpStatus[200]))
    .catch(e => next(e));
};

const setMode = (req, res, next) => {
  const {
    user,
    body: {
      mode,
    },
  } = req;

  user.set('mode', mode);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

module.exports = {
  getAllData,
  changePassword,
  statistic,
  deleteAccount,
  setMode,
};
