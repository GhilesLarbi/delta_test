const { usersDb } = require('../db');
const bcrypt = require('bcrypt');
const Joi = require('joi');

class User {
  constructor(data) {
    this._id = data._id;
    this._rev = data._rev;
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.username = data.username;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static get schema() {
    return Joi.object({
      _id: Joi.string().optional(),
      _rev: Joi.string().optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().min(2).max(50).required(),
      username: Joi.string().min(3).max(30).required(),
      createdAt: Joi.date().iso().optional(),
    });
  }

  async save() {
    const userDoc = {
      _id: this._id,
      _rev: this._rev,
      email: this.email,
      password: await bcrypt.hash(this.password, 10),
      name: this.name,
      username: this.username,
      createdAt: this.createdAt,
    };

    let result;
    if (this._id && this._rev) {
      // Update existing document
      result = await usersDb.put(userDoc);
    } else {
      // Create new document
      result = await usersDb.post(userDoc);
    }

    this._id = result.id;
    this._rev = result.rev;

    return result;
  }

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  static async findByEmail(email) {
    const result = await usersDb.find({
      selector: { email },
      limit: 1,
    });

    if (result.docs.length > 0) {
      return new User(result.docs[0]);
    } else {
      return null;
    }
  }

  static async getById(userId) {
    try {
      const doc = await usersDb.get(userId);
      return new User(doc);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async delete() {
    if (!this._id || !this._rev) {
      throw new Error('Cannot delete a user without _id and _rev');
    }

    const result = await usersDb.remove(this._id, this._rev);
    return result;
  }

  toJSON() {
    return {
      id: this._id,
      email: this.email,
      name: this.name,
      username: this.username,
      createdAt: this.createdAt,
    };
  }
}

module.exports = User;