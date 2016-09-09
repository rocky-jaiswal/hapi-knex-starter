'use strict';

const Config = require('config');

const dbConfiguration = {
  client: 'postgresql',
  connection: {
    host:     Config.get('db.host'),
    database: Config.get('db.name'),
    user:     Config.get('db.user'),
    password: Config.get('db.password')
  },
  pool: {
    min: 5,
    max: 10
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

module.exports = {
  development: dbConfiguration,
  test: { client: 'sqlite3',
          useNullAsDefault: true,
          connection: { filename: './db/todo_app_test.sqlite' },
          migrations: { directory: './db/migrations',
                        tableName: 'knex_migrations' }
        },
  production: dbConfiguration
};
