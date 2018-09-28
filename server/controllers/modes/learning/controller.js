const httpStatus = require('http-status');

const options = (req, res, next) => {
  const {
    user,
    body,
  } = req;

  user.set('modes.learning', body);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const mode = (req, res, next) => {
  const {
    user,
    body,
  } = req;

  user.set('modes.learning.mode', body);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const fingers = (req, res, next) => {
  const {
    user,
    body,
  } = req;

  user.set('modes.learning.fingers', body);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const free = (req, res, next) => {
  const {
    user,
    body,
  } = req;

  user.set('modes.learning.free', body);

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

module.exports = {
  options,
  mode,
  fingers,
  free,
};
