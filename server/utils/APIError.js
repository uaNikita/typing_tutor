const httpStatus = require('http-status');

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends Error {
  constructor(options) {
    const {
      message,
      errors,
    } = options;

    let {
      status,
    } = options;

    if (!status) {
      status = httpStatus.INTERNAL_SERVER_ERROR;
    }

    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = APIError;
