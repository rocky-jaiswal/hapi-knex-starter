'use strict';

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex.raw('truncate table todos cascade')
    .then( () => knex('users').whereIn('email', ['u1@example.com', 'u2@example.com']) )
    .then( (users) => {

      return Promise.all([
        // Inserts seed entries
        knex('todos').insert({ title: 't1', description: 'd3', user_id: users[0].id }),
        knex('todos').insert({ title: 't2', description: 'd2', user_id: users[0].id }),
        knex('todos').insert({ title: 't3', description: 'd3', user_id: users[1].id })
      ]);
    });
};
