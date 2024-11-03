const AppError = require('../utils/appError');

const errorHandler = (err, req, res, next) => {
  // Handle invalid JSON errors thrown by express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
      code: 'INVALID_JSON',
    });
  }

  // Handle errors from body-parser for invalid JSON
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
      code: 'INVALID_JSON',
    });
  }

  // If the error is an instance of AppError, use its properties
  if (err instanceof AppError) {
    const errorResponse = {
      success: err.success,
      message: err.message,
      code: err.code,
    };

    if (err.field) {
      errorResponse.field = err.field;
    }

    return res.status(err.statusCode).json(errorResponse);
  }

  // For other errors, return a generic 500 server error
  console.error('Unhandled Error:', err);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
  });
};

module.exports = errorHandler;