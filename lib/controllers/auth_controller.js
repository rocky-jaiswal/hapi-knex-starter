'use strict';

const Boom  = require('boom');
const User  = require('../models/user');
const Token = require('../models/token');

class Auth {

  create(request, response) {

    User.findByEmail(request.payload.email)
      .then( (user) => User.validateLogin(user, request.payload.password) )
      .then( (result) => response({ token: Token.generate(result.id) }) )
      .catch( (error)  => response(Boom.forbidden(error.message)) );
  }

}

module.exports = new Auth();
