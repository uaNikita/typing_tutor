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
    if (err instanceof APIError) {
      next(err);
    }
    else if (err instanceof mongoose.Error.ValidationError) {
      const errors = _.mapValues(err.errors, o => o.message);

      const apiError = new APIError({
        message: 'validation error',
        status: httpStatus.BAD_REQUEST,
        errors,
      });

      next(apiError);
    }
    else {
      const apiError = new APIError({
        message: err.message,
        status: err.status,
      });

      next(apiError);
    }
  });

  app.use((err, req, res) => {
    res.status(err.status).json(_.assign({ message: err.message }, err));
  });
};
