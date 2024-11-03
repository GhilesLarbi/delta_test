class AppError extends Error {
    constructor({ message, statusCode, code, field }) {
      super(message);
  
      this.statusCode = statusCode || 500;
      this.code = code || 'INTERNAL_SERVER_ERROR';
      this.field = field || null;
      this.success = false;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;