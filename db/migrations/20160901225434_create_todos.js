'use strict';

exports.up = (knex, Promise) => {

  return knex.schema.createTable('todos', (table) => {

    table.increments('id').primary();
    table.text('title');
    table.text('description');

    table.integer('user_id');
    table.foreign('user_id').references('users.id');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {

  return knex.schema.dropTable('todos');
};
