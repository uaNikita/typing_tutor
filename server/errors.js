const mongoose = require('mongoose');
const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('./utils/APIError');

module.exports = app => {
  app.use((req, res, next) => {
    const apiError = new APIError({
      message: 'API not found',
      status: httpStatus.NOT_FOUND,
    });

    next(apiError);
  });

  app.use((err, req, res, next) => {
    let error;

    if (err instanceof APIError) {
      error = err;
    }
    else if (err instanceof mongoose.Error.ValidationError) {
      const errors = _.mapValues(err.errors, o => o.message);

      error = new APIError({
        message: 'validation error',
        status: httpStatus.BAD_REQUEST,
        errors,
      });
    }
    else {
      error = new APIError({
        message: err.message,
        status: err.status,
      });
    }

    if (error) {
      console.log('error', error);

      res
        .status(error.status)
        .json(_.assign({ message: error.message }, error));
    }
    else {
      // for eslint only
      next();
    }
  });
};
