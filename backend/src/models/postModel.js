const { postsDb } = require('../db');
const Joi = require('joi');

class Post {
  constructor(data) {
    this._id = data._id;
    this._rev = data._rev;
    this.user_id = data.user_id;
    this.type = data.type;
    this.title = data.title;
    this.body = data.body;
    this.likes = data.likes || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static get schema() {
    return Joi.object({
      _id: Joi.string().optional(),
      _rev: Joi.string().optional(),
      user_id: Joi.string().required(),
      type: Joi.string().valid('goods', 'services').required(),
      title: Joi.string().min(1).max(100).required(),
      body: Joi.string().min(1).required(),
      likes: Joi.number().integer().min(0).optional(),
      createdAt: Joi.date().iso().optional(),
    });
  }

  async save() {
    const postDoc = {
      _id: this._id,
      _rev: this._rev,
      user_id: this.user_id,
      type: this.type,
      title: this.title,
      body: this.body,
      likes: this.likes,
      createdAt: this.createdAt,
    };

    let result;
    if (this._id && this._rev) {
      // Update existing document
      result = await postsDb.put(postDoc);
    } else {
      // Create new document
      result = await postsDb.post(postDoc);
    }

    this._id = result.id;
    this._rev = result.rev;

    return result;
  }

  static async getById(postId) {
    try {
      const doc = await postsDb.get(postId);
      return new Post(doc);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  static async getAllByUserId(userId) {
    const result = await postsDb.find({
      selector: { user_id: userId },
    });
    return result.docs.map((doc) => new Post(doc));
  }

  async delete() {
    if (!this._id || !this._rev) {
      throw new Error('Cannot delete a post without _id and _rev');
    }

    const result = await postsDb.remove(this._id, this._rev);
    return result;
  }
}

module.exports = Post;