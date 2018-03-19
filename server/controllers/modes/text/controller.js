const _ = require('lodash');
const httpStatus = require('http-status');

const User = require('../../../models/user');

const add = (req, res, next) => {
  const {
    user: {
      id: userId,
    },
    body: {
      id,
      text,
      select,
    },
  } = req;

  User.get(userId)
    .then(user => {
      const entity = {
        id,
        typed: '',
        last: text,
      };

      const userToSave = user;

      const textMode = userToSave.modes.text;

      textMode.entities.push(entity);

      if (select) {
        textMode.selectedId = entity.id;
      }

      return userToSave.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

const select = (req, res, next) => {
  const {
    user: {
      id: userId,
    },
    body: {
      id,
    },
  } = req;

  User.get(userId)
    .then(user => {
      const userToSave = user;

      userToSave.modes.text.selectedId = id;

      return userToSave.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

const refresh = (req, res, next) => {
  const {
    user: {
      id: userId,
    },
    body: {
      id,
    },
  } = req;

  User.get(userId)
    .then(user => {
      const userToSave = user;

      const entity = _.find(userToSave.modes.text.entities, { id });

      entity.last = entity.typed + entity.last;

      entity.typed = '';

      return userToSave.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

const type = (req, res, next) => {
  const {
    user: {
      id: userId,
    },
    body: {
      id,
      typed,
    },
  } = req;

  User.get(userId)
    .then(user => {
      const userToSave = user;

      const entity = _.find(userToSave.modes.text.entities, { id });

      const text = entity.typed + entity.last;

      entity.typed = text.slice(0, typed);
      entity.last = text.slice(typed);

      return userToSave.save().then(() => res.json(httpStatus[200]));

      // try
      // const entityIndex = _.find(user.modes.text.entities, { id });
      //
      // const entityPath = `modes.text.entities.${entityIndex}`;
      //
      // const text = user.get(`${entityPath}.typed`) + user.get(`${entityPath}.last`);
      //
      // user.set(`${entityPath}.typed`, text.slice(0, typed));
      //
      // user.set(`${entityPath}.last`, text.slice(typed));
      //
      // return user.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

module.exports = {
  add,
  select,
  refresh,
  type,
};
