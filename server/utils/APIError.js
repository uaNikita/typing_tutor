let httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param options - Error message, HTTP status code of error, errors description
   */
  constructor(options) {
    let {
            message,
            status,
            errors
          } = options;

    if (!status) {
      status = httpStatus.INTERNAL_SERVER_ERROR
    }
    
    super(message, status, errors);
  }
}

module.exports = APIError;
