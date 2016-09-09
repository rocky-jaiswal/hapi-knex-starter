'use strict';

const TodosController = require('../controllers/todos_controller');
const AuthController = require('../controllers/auth_controller');

const Routes = {
  config: [
    { method: 'POST', path: '/auth',  config: { handler: AuthController.create, auth: false } },
    { method: 'GET',  path: '/todos', config: { handler: TodosController.index              } },
    { method: 'POST', path: '/todos', config: { handler: TodosController.create             } }
  ]
};

module.exports = Routes;
