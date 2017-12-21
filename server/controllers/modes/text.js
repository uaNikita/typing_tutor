const _ = require('lodash');
const httpStatus = require('http-status');

const User = require('../../models/user');

const add = (req, res, next) => {
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

const select = (req, res, next) => {
  const {
    user,
    body: {
      id,
    },
  } = req;

  User.get(user.id)
    .then(user => {
      user.modes.text.selectedId = id;

      return user.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

const refresh = (req, res, next) => {
  const {
    user,
    body: {
      id,
    },
  } = req;

  User.get(user.id)
    .then(user => {
      const entity = _.find(user.modes.text.entities, { id });

      entity.last = entity.typed + entity.last;

      entity.typed = '';

      return user.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

module.exports = {
  add,
  select,
  refresh,
};
