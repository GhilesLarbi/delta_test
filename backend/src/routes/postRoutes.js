const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const authenticateToken = require('../middleware/authMiddleware');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const validateRequest = require('../middleware/validateRequest');
const Joi = require('joi');


router.post(
  '/',
  authenticateToken,
  validateRequest(
    Post.schema.keys({
      user_id: Joi.forbidden(),
    })
  ),
  asyncHandler(async (req, res) => {
    const { type, title, body } = req.body;
    const userId = req.user._id;

    const post = new Post({
      ...req.body,
      user_id: userId,
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully', post });
  })
);


router.get('/', authenticateToken, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const posts = await Post.getAllByUserId(userId);
    res.json(posts);
}))


router.get('/:id', authenticateToken, asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.getById(postId);

    if (!post)
      throw new AppError({
        message: 'Post not found',
        statusCode: 404,
        code: 'POST_NOT_FOUND',
      });


    if (post.user_id !== req.user.id)
      throw new AppError({
        message: 'Access denied',
        statusCode: 403,
        code: 'ACCESS_DENIED',
      });

    res.json(post);
}))

router.delete('/:id', authenticateToken, asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.getById(postId);

    if (!post)
      throw new AppError({
        message: 'Post not found',
        statusCode: 404,
        code: 'POST_NOT_FOUND',
      })

    if (post.user_id !== req.user.id)
      throw new AppError({
        message: 'Access denied',
        statusCode: 403,
        code: 'ACCESS_DENIED',
      });

    await post.delete();

    res.json({ message: 'Post deleted successfully' });
}))

module.exports = router;