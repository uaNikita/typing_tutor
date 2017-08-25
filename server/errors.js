let mongoose = require('mongoose');
let _ = require('lodash');
let httpStatus = require('http-status');
let APIError = require('./helpers/APIError');

module.exports = (app) => {

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    console.log(1);
    const err = new APIError({
      message: 'API not found',
      status: httpStatus.NOT_FOUND
    });

    return next(err);
  });

  app.use((err, req, res, next) => {
    
    console.log(2);
    
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = _.mapValues(err.errors, o => o.message);

      const apiError = new APIError({
        message: 'validation error',
        status: httpStatus.BAD_REQUEST,
        errors
      });

      return next(apiError);
    }

    if (!(err instanceof APIError)) {
      const apiError = new APIError({
        message: err.message,
        status: err.status
      });

      return next(apiError);
    }

    return next(err);
  });


  // error handler
  app.use((err, req, res, next) => {

    let response = {
      message: err.message
    };

    if (err.errors) {
      response.errors = err.errors;
    }

    res.status(err.status).json(response);

  });

};
