const _ = require('lodash');
const httpStatus = require('http-status');

const APIError = require('../../../utils/APIError');
const races = require('./races');

const get = (req, res,) => {
  const {
    user,
  } = req;

  const race = _.find(races, { id: user.get('id'), });

  // if (race) {
  //   res.json(race);
  // }
  // else {
  //   throw new APIError({
  //     status: httpStatus.NOT_FOUND,
  //   });
  // }

  res.json('asfasfdsafd');
};

module.exports = {
  get,
};
