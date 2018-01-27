const _ = require('lodash');
const moment = require('moment');
const httpStatus = require('http-status');

const User = require('../../models/user');
const Statistic = require('../../models/statistic');

const getAllData = (req, res, next) => {
  const {
    user: {
      id: userId,
    }
  } = req;

  Promise.all([User.get(userId), Statistic.findOne({ user: userId }).exec()])
    .then(([user, statistic]) => {
      const data = user.toObject();

      if (statistic) {
        data.profile.statistic = statistic.toObject();
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
      old_password,
      new_password,
    },
  } = req;

  User.get(userId)
    .then(user =>
      user.validPassword(old_password)
        .then(valid => {
          if (valid) {
            user.profile.password = new_password;

            return user.save().then(() => res.json(httpStatus[200]));
          }
          else {
            throw new APIError({
              errors: {
                old_password: 'Incorrect password'
              },
              status: httpStatus.BAD_REQUEST
            });
          }
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
    .then(statistic => {
      if (statistic) {
        const modePath = `${keyboard}.${mode}`;

        if (!statistic.get(modePath)) {
          statistic.set(modePath, [clientStatistic]);
        }
        else {
          statistic.set(`${modePath}.${sessionId}`, clientStatistic);
        }

        return statistic.save().then(() => res.json(httpStatus[200]));
      }
      else {
        const newStatistic = {
          user: user.id,
        };

        _.set(newStatistic, `${keyboard}.${mode}`, [clientStatistic]);

        new Statistic(newStatistic, { strict: false }).save().then(() => res.json(httpStatus[200]));
      }
    })
    .catch(e => next(e));
};

module.exports = {
  getAllData,
  changePassword,
  statistic,
};
