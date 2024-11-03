const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { generateToken } = require('../utils/tokenUtils');
const authenticateToken = require('../middleware/authMiddleware');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const validateRequest = require('../middleware/validateRequest');
const Joi = require('joi');


router.post(
  '/register',
  validateRequest(User.schema),
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new AppError({
        message: 'Email already in use',
        statusCode: 409,
        code: 'EMAIL_IN_USE',
        field: 'email',
      });
    }

    const user = new User(req.body);
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  })
);

router.post(
  '/login',
  validateRequest(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
  ),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError({
        message: 'Invalid email or password',
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
      });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      throw new AppError({
        message: 'Invalid email or password',
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
      });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  })
);

router.get('/current-user', authenticateToken, asyncHandler(async (req, res) => {
  const user = await User.getById(req.user._id);
  if (!user) {
    throw new AppError({
      message: 'User not found',
      statusCode: 404,
      code: 'USER_NOT_FOUND',
    });
  }
  res.json(user.toJSON());
}));

router.get('/:id', authenticateToken, asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // only allow users to get their own data
  // if (userId !== req.user._id) {
  //   return res.status(403).json({ message: 'Access denied' });
  // }

  const user = await User.getById(userId);
  if (!user) {
    throw new AppError({
      message: 'User not found',
      statusCode: 404,
      code: 'USER_NOT_FOUND',
    });
  }

  res.json(user.toJSON());
}));

router.delete('/', authenticateToken, asyncHandler(async (req, res) => {
  // const userId = req.params.id;
  // if (String(userId) !== String(req.user._id)) {
  //   throw new AppError({
  //     message: 'Access denied',
  //     statusCode: 403,
  //     code: 'ACCESS_DENIED',
  //   });
  // }

  const userId = String(req.user._id)

  const user = await User.getById(userId);

  if (!user) {
    throw new AppError({
      message: 'User not found',
      statusCode: 404,
      code: 'USER_NOT_FOUND',
    });
  }

  await user.delete();

  res.json({ message: 'User deleted successfully' });
}))

module.exports = router;