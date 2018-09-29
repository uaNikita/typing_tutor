const httpStatus = require('http-status');

const options = (req, res, next) => {
  const {
    user,
    body: learning,
  } = req;

  user.set({
    modes: {
      learning,
    }
  });

  user.save()
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

module.exports = {
  options,
};
