const crypto = require('crypto');
const httpStatus = require('http-status');

const User = require('../models/user');

const addText = (req, res, next) => {
  const {
    text,
    select,
    user: {
      id,
    }
  } = req;

  User.get(id)
    .then(user => {
      const entity = {
        id: crypto.randomBytes(40).toString('hex'),
        typed: '',
        last: text,
      }

      user.modes.text.entities.push(entity);

      if (select) {
        user.modes.selectedId = entity.id;
      }

      return user.save().then(() => res.json(entity.id));
    })
    .catch(e => next(e));
}


module.exports = {
  addText,
};