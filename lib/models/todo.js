'use strict';

const DB = require('./db');

class Todo {

  /**
  * Create a todo
  *
  * * @returns promise
  */
  create(userID, todo) {

    return DB('todos').insert({ title: todo.title, description: todo.description, user_id: userID });
  }

  /**
  * Returns all todos for a user
  *
  * * @returns promise
  */
  findByUserId(id) {

    return DB('todos').where({ user_id: id });
  }

}

module.exports = new Todo();
