'use strict';

const Joi     = require('joi');
const Bcrypt  = require('bcryptjs');
const Promise = require('bluebird');
const DB      = require('./db');

class User {

  encrypt(password) {

    return Bcrypt.hashSync(password);
  }

  validate(user) {

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required()
    });
    return Joi.validate(user, schema);
  }

  create(email, password, admin = false) {

    const { error } = this.validate({ email, password });
    if (error === null) {
      return DB('users').insert({ email, password: this.encrypt(password), admin });
    }
    return Promise.reject('User validation failed.');
  }

  findByEmail(email) {

    return DB('users').where({ email }).first();
  }

  validateLogin(user, password) {

    return new Promise((resolve, reject) => {

      if (user && user.password && Bcrypt.compareSync(password, user.password)) {
        resolve({ success: true, id: user.id });
      }
      else {
        reject({ success: false, message: 'Invalid username / password' });
      }
    });
  }

}

module.exports = new User();
