const _ = require('lodash');
const httpStatus = require('http-status');

const User = require('../../models/user');

const getAllData = (req, res, next) =>
  User.get(req.user.id)
    .then(user => res.json(user.toObject()))
    .catch(e => next(e));

const changePassword = (req, res, next) => {
  const {
    user,
    body: {
      id,
      text,
      select,
    },
  } = req;

  User.get(user.id)
    .then(user => {
      const entity = {
        id,
        typed: '',
        last: text,
      };

      const textMode = user.modes.text;

      textMode.entities.push(entity);

      if (select) {
        textMode.selectedId = entity.id;
      }

      return user.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

module.exports = {
  getAllData,
  changePassword,
};
