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
    body,
    params,
  } = req;

  const id = parseInt(params.id, 10);

  const selectText = () => user.set('modes.text.selectedId', id);
  const pathToEntites = 'modes.text.entities';
  const index = user.get(pathToEntites).findIndex(item => item.id === id);
  const entityPath = `modes.text.entities.${index}`;
  const entity = user.get(entityPath);

  switch (body.action) {
    case 'select':
      selectText();
      break;

    case 'refresh':
      user.set(`${entityPath}.last`, entity.typed + entity.last);
      user.set(`${entityPath}.typed`, '');

      break;

    case 'change-text':
      user.set(`${entityPath}.last`, body.text);
      user.set(`${entityPath}.typed`, '');

      if (body.select) {
        selectText();
      }
      break;

    case 'type':
      const text = entity.typed + entity.last;
      const slicePoint = body.typed;

      user.set(`${entityPath}.typed`, text.slice(0, slicePoint));
      user.set(`${entityPath}.last`, text.slice(slicePoint));
      break;

    default:
  }

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const del = (req, res, next) => {
  const {
    user,
    params,
  } = req;

  const id = parseInt(params.id, 10);
  const pathToEntites = 'modes.text.entities';
  const entities = user.get(pathToEntites).filter(item => item.id !== id);

  user.set(pathToEntites, entities);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

module.exports = {
  add,
  update,
  del,
};
