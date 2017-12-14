const crypto = require('crypto');

const User = require('../../models/user');

const add = (req, res, next) => {
  const {
    user: {
      id,
    },
    body: {
      text,
      select,
    },
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
  add,
};
