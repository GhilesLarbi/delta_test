const AppError = require('../utils/appError');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const firstError = error.details[0];
      const message = firstError.message;
      const field = firstError.path.join('.');

      throw new AppError({
        message: message,
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        field: field,
      });
    }

    req.body = value;

    next();
  };
};

module.exports = validateRequest;