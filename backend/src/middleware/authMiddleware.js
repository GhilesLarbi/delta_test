const { verifyToken } = require('../utils/tokenUtils');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(
      new AppError({
        message: 'Access token missing',
        statusCode: 401,
        code: 'TOKEN_MISSING',
      })
    );
  }

  try {
    const decoded = verifyToken(token);

    const user = await User.getById(decoded.id);

    if (!user) {
      return next(
        new AppError({
          message: 'Invalid token: user not found',
          statusCode: 401,
          code: 'INVALID_TOKEN',
        })
      );
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return next(
      new AppError({
        message: 'Invalid token',
        statusCode: 403,
        code: 'INVALID_TOKEN',
      })
    );
  }
};

module.exports = authenticateToken;