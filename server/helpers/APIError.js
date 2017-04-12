let httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
   constructor(message, status) {
      super(message);
      this.name = this.constructor.name;
      this.message = message;
      this.status = status;
      Error.captureStackTrace(this, this.constructor.name);
   }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
   /**
    * Creates an API error.
    * @param {string} message - Error message.
    * @param {number} status - HTTP status code of error.
    */
   constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
      super(message, status);
   }
}

module.exports = APIError;