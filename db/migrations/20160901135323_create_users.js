'use strict';

exports.up = (knex, Promise) => {

  return knex.schema.createTable('users', (table) => {

    table.increments('id').primary();
    table.text('email').unique();
    table.text('password');
    table.boolean('admin').defaultTo(false);

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {

  return knex.schema.dropTable('users');
};
