const httpStatus = require('http-status');

const APIError = require('../../utils/APIError');
const Client = require('../../models/client');
const Statistic = require('../../models/statistic');
const Verification = require('../../models/verification');

const getData = (req, res, next) => {
  const {
    user,
  } = req;

  Statistic.find({ user: user.get('id') }).exec()
    .then((statistic) => {
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
    .then((valid) => {
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
    body,
  } = req;

  Statistic
    .findOne({
      user: user.get('id'),
      start: body.start,
    })
    .exec()
    .then((stats) => {
      if (stats) {
        stats.set({
          ...body,
        });

        return stats.save();
      }

      return new Statistic(
        {
          user: user.get('id'),
          ...body,
        },
        { strict: false },
      ).save();
    })
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const deleteAccount = (req, res, next) => {
  const {
    user,
    body: {
      confirmNewPassword,
    },
  } = req;

  user.validPassword(confirmNewPassword)
    .then((valid) => {
      if (valid) {
        const userId = user.get('id');

        return Promise.all([
          Client.find({ user: userId }),
          Statistic.find({ user: userId }),
          Verification.find({ user: userId }),
        ]);
      }

      throw new APIError({
        errors: {
          confirmNewPassword: 'Incorrect password',
        },
        status: httpStatus.BAD_REQUEST,
      });
    })
    .then(([clients, statistics, verifications]) => {
      const modelsForRemoval = [user];

      if (clients) {
        clients.map(client => modelsForRemoval.push(client));
      }

      if (statistics) {
        statistics.map(stc => modelsForRemoval.push(stc));
      }

      if (verifications) {
        verifications.forEach(verification => modelsForRemoval.push(verification));
      }

      return Promise.all(modelsForRemoval.map(doc => doc.remove()));
    })
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const setSettings = (req, res, next) => {
  const {
    user,
    body,
  } = req;

  user.set(body);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

module.exports = {
  getData,
  changePassword,
  statistic,
  deleteAccount,
  setSettings,
};
