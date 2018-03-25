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
      const entityIndex = _.findIndex(user.modes.text.entities, { id });

      const entityPath = `modes.text.entities.${entityIndex}`;

      const entity = user.get(entityPath);

      user.set(`${entityPath}.last`, entity.typed + entity.last);

      user.set(`${entityPath}.typed`, '');

      return user.save();
    })
    .then(() => res.json(httpStatus[200]))
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
      const entityIndex = _.findIndex(user.modes.text.entities, { id });

      const entityPath = `modes.text.entities.${entityIndex}`;

      const entity = user.get(entityPath);

      const text = entity.typed + entity.last;

      const slicePoint = typed + 1;

      user.set(`${entityPath}.typed`, text.slice(0, slicePoint));

      user.set(`${entityPath}.last`, text.slice(slicePoint));

      return user.save();
    })
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

module.exports = {
  add,
  select,
  refresh,
  type,
};
