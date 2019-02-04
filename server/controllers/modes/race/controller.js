const httpStatus = require('http-status');

const get = (req, res,) => {
  const {
    user,
  } = req;

  res.json(user.get('id'));
};

module.exports = {
  get,
};
