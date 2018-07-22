const _ = require('lodash');
const httpStatus = require('http-status');

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

  const pathToTextMode = 'modes.text';

  const indexToSet = user.get(`${pathToTextMode}.entities`).length;

  user.set(`${pathToTextMode}.entities.${indexToSet}`, entity);

  if (select) {
    user.set(`${pathToTextMode}.selectedId`, entity.id);
  }

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const update = (req, res, next) => {
  const {
    user,
    body: {
      text,
      select,
    },
    params: {
      id,
    }
  } = req;

  console.log('id', id);

  const entities = user.get('mode.text.entities');

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const select = (req, res, next) => {
  const {
    user,
    params: {
      id,
    }
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
  update,
  select,
  refresh,
  type,
};
