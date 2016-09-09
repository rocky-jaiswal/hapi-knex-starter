'use strict';

const Bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex.raw('truncate table users cascade')
    .then(() => {

      return Promise.all([
        // Inserts seed entries
        knex('users').insert({ email: 'u1@example.com', password: Bcrypt.hashSync('123456') }),
        knex('users').insert({ email: 'u2@example.com', password: Bcrypt.hashSync('123456') })
      ]);
    });
};
