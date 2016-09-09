'use strict';

const Boom = require('boom');
const Todo = require('../models/todo');

class TodosController {

  index(request, response) {

    Todo.findByUserId(request.auth.credentials.id)
      .then((result) => response(result))
      .catch((error) => response(Boom.badImplementation(error.message)));
  }

  create(request, response) {

    const userId = request.auth.credentials.id;
    Todo.create(userId, request.payload.todo)
      .then((result) => response(result))
      .catch((error) => response(Boom.badImplementation(error.message)));
  }

}

module.exports = new TodosController();
