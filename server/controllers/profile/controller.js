const _ = require('lodash');
const moment = require('moment');
const httpStatus = require('http-status');

const APIError = require('../../utils/APIError');
const User = require('../../models/user');
const Access = require('../../models/access');
const Client = require('../../models/client');
const Statistic = require('../../models/statistic');
const Verification = require('../../models/verification');

const getAllData = (req, res, next) => {
  const {
    user: {
      id: userId,
    },
  } = req;

  Promise.all([User.findById(userId).exec(), Statistic.find({ user: userId }).exec()])
    .then(([user, statistic]) => {
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
    user: {
      id: userId,
    },
    body: {
      old_password: oldPassword,
      new_password: newPassword,
    },
  } = req;

  User.get(userId)
    .then(user =>
      user.validPassword(oldPassword)
        .then(valid => {
          if (valid) {
            const userForSave = user;

            userForSave.password = newPassword;

            return userForSave.save().then(() => res.json(httpStatus[200]));
          }

          throw new APIError({
            errors: {
              old_password: 'Incorrect password',
            },
            status: httpStatus.BAD_REQUEST,
          });
        }))
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
      user: user.id,
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
    user: {
      id: userId,
    },
    body: {
      confirm_new_password: confirmNewPassword,
    },
  } = req;

  User
    .findById(userId).exec()
    .then(user =>
      user.validPassword(confirmNewPassword)
        .then(valid => {
          if (valid) {
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
            return Promise.all(clients.map(client => {
              modelsForRemoval.push(client);

              return Access
                .find({ client }).exec()
                .then(accesses => {
                  accesses.forEach(access =>
                    modelsForRemoval.push(access));
                });
            }))
              .then(() => modelsForRemoval);
          }

          return modelsForRemoval;
        })
        .then(modelsForRemoval =>
          Promise.all(modelsForRemoval.map(doc => doc.remove())))
        .then(() =>
          res.json(httpStatus[200])))
    .catch(e => next(e));
};

const setMode = (req, res, next) => {
  const {
    user: {
      id: userId,
    },
    body: {
      mode,
    },
  } = req;

  User.get(userId)
    .then(user => {
      user.set('mode', mode);

      res.json(httpStatus[200]);
    })
    .catch(e => next(e));
};

module.exports = {
  getAllData,
  changePassword,
  statistic,
  deleteAccount,
  setMode,
};
