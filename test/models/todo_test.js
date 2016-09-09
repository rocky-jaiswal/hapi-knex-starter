'use strict';

//Use this for all tests
const Code = require('code');
const Lab  = require('lab');
const lab  = exports.lab = Lab.script();
const { describe, it, before, after } = lab;
const { expect } = Code;
const KnexCleaner = require('knex-cleaner');

const DB   = require('../../lib/models/db');
const Todo = require('../../lib/models/todo');

describe('todo model', () => {

  const userId = 101;

  before({ timeout: 5000 }, (done) => {

    KnexCleaner.clean(DB).then(() => {

      Promise.all([
        DB('users').insert([
          {
            id: userId,
            email: 'ronald@mcdonald.com'
          }
        ]),
        DB('todos').insert([
          {
            id: 1,
            title: 't1',
            user_id: userId
          }
        ])
      ]).then((res) => {

        done();
      }).catch((err) => {

        expect(err).to.not.exist();
        console.error(err);
        done(err);
      });
    });
  });

  it('persists the todo', (done) => {

    const promise = Todo.create(userId, { title: 'foo', description: 'bar' });
    promise.then((res) => {

      expect(res).to.be.instanceof(Array);
      done();
    }).catch((err) => {

      console.error(err);
      expect(err).to.not.exist();
      done(err);
    });
  });

  it('fetches the todo for a user', (done) => {

    const promise = Todo.findByUserId(userId);
    promise.then((res) => {

      expect(res).to.be.instanceof(Array);
      done();
    }).catch((err) => {

      console.error(err);
      expect(err).to.not.exist();
      done(err);
    });
  });

  after({ timeout: 5000 }, (done) => {

    KnexCleaner.clean(DB).then(() => {

      done();
    }).catch((err) => {

      expect(err).to.not.exist();
      console.error(err);
      done(err);
    });
  });

});
