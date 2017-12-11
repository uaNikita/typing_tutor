const httpStatus = require('http-status');

const APIError = require('../utils/APIError');
const User = require('../models/user');

const addText = (req, res, next) => {
  const {
    text,
    select,
    user: {
      id,
    }
  } = req;

  User.get(req.user.id)
    .then(user => {
      user.modes.text.entities.push({
        id: 1,
        typed: '',
        last: text,
      });

      console.log(user.get('modes.text'));

      res.json(httpStatus[200]);
    })
    .catch(e => next(e));
}


module.exports = {
  addText,
};