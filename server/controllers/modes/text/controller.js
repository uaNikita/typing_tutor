const _ = require('lodash');
const httpStatus = require('http-status');

const User = require('../../../models/user');

const add = (req, res, next) => {
  const {
    user,
    body: {
      id,
      text,
      select,
    },
  } = req;

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

  userToSave.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const select = (req, res, next) => {
  const {
    user,
    body: {
      id,
    },
  } = req;

  user.set('modes.text.entities.selectedId', id);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const refresh = (req, res, next) => {
  const {
    user,
    body: {
      id,
    },
  } = req;

  const entityIndex = _.findIndex(user.modes.text.entities, { id });

  const entityPath = `modes.text.entities.${entityIndex}`;

  const entity = user.get(entityPath);

  user.set(`${entityPath}.last`, entity.typed + entity.last);

  user.set(`${entityPath}.typed`, '');

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const type = (req, res, next) => {
  const {
    user,
    body: {
      id,
      typed,
    },
  } = req;

  const entityIndex = _.findIndex(user.modes.text.entities, { id });

  const entityPath = `modes.text.entities.${entityIndex}`;

  const entity = user.get(entityPath);

  const text = entity.typed + entity.last;

  const slicePoint = typed + 1;

  user.set(`${entityPath}.typed`, text.slice(0, slicePoint));

  user.set(`${entityPath}.last`, text.slice(slicePoint));

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

module.exports = {
  add,
  select,
  refresh,
  type,
};
