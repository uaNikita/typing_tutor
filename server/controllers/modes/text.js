const httpStatus = require('http-status');

const User = require('../../models/user');

const add = (req, res, next) => {
  const {
    user,
    body: {
      id,
      text,
      select,
    },
  } = req;

  console.log(id, text, select);

  User.get(user.id)
    .then(user => {
      const entity = {
        id,
        typed: '',
        last: text,
      };

      user.modes.text.entities.push(entity);

      if (select) {
        user.modes.selectedId = entity.id;
      }

      return user.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

module.exports = {
  add,
};
