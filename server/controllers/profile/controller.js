const _ = require('lodash');
const httpStatus = require('http-status');

const User = require('../../models/user');
const Statistic = require('../../models/statistic');

const getAllData = (req, res, next) => {

  console.log(12222);

  Promise.all([User.get(req.user.id), Statistic.findOne({ user: req.user.id }).exec()])
    .then(([user, statistic]) => {
      res.json(user.toObject());
    })
    .catch(e => next(e));

  // User.get(req.user.id)
  //   .then(user => {
  //
  //     Statistic
  //       .findOne({ user: user.id })
  //       .exec()
  //       .then((...args) => {
  //         console.log(1111111111);
  //         console.log(args);
  //       })
  //       .catch(e => {
  //         console.log(2222222222);
  //         console.log(e);
  //       });
  //
  //     res.json(user.toObject())
  //   })
  //   .catch(e => next(e));
}


const changePassword = (req, res, next) => {
  const {
    user,
    body: {
      id,
      text,
      select,
    },
  } = req;

  User.get(user.id)
    .then(user => {
      const entity = {
        id,
        typed: '',
        last: text,
      };

      const textMode = user.modes.text;

      textMode.entities.push(entity);

      if (select) {
        textMode.selectedId = entity.id;
      }

      return user.save().then(() => res.json(httpStatus[200]));
    })
    .catch(e => next(e));
};

module.exports = {
  getAllData,
  changePassword,
};
