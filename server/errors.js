let mongoose = require('mongoose');
let _ = require('lodash');
let httpStatus = require('http-status');
let APIError = require('./helpers/APIError');

module.exports = (app) => {

   app.use((err, req, res, next) => {

      if (err instanceof mongoose.Error.ValidationError) {

         const errorMessages = _.mapValues(err.errors, o => o.message);

         const error = new APIError(errorMessages);

         return next(error);

      }

      if (!(err instanceof APIError)) {

         const apiError = new APIError(err.message, err.status);

         return next(apiError);

      }

      return next(err);

   });

   // catch 404 and forward to error handler
   app.use((req, res, next) => {

      const err = new APIError('API not found', httpStatus.NOT_FOUND);

      return next(err);

   });

   // error handler
   app.use((err, req, res, next) => {

      let response = {
         message: err.message
      };

      res.status(err.status).json(response);

   });

};