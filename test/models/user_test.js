'use strict';

//Use this for all tests
const Code = require('code');
const Lab  = require('lab');
const lab  = exports.lab = Lab.script();
const { describe, it, before, after } = lab;
const { expect } = Code;
const KnexCleaner = require('knex-cleaner');

const DB   = require('../../lib/models/db');
const User = require('../../lib/models/user');

describe('user model', () => {

  const userId = 101;
  const userEmail = 'u1@example.com';

  before({ timeout: 5000 }, (done) => {

    KnexCleaner.clean(DB).then(() => {

      Promise.all([
        DB('users').insert([{ id: userId, email: userEmail }])
      ]).then((res) => {

        done();
      }).catch((err) => {

        expect(err).to.not.exist();
        console.error(err);
        done(err);
      });
    });
  });

  it('does not create an invalid user', (done) => {

    const promise = User.create('foo@example.com', '123');
    promise.then((res) => {

      done('failed');
    }).catch((err) => {

      expect(err).to.exist();
      done();
    });
  });

  it('finds the user by email', (done) => {

    const promise = User.findByEmail(userEmail);
    promise.then((res) => {

      expect(res.email).to.equal(userEmail);
      done();
    }).catch((err) => {

      console.error(err);
      expect(err).to.not.exist();
      done(err);
    });
  });

  it('validates the user', (done) => {

    const promise = User.create('foo@example.com', '123456')
      .then(() => User.findByEmail('foo@example.com')).then((user) => User.validateLogin(user, '123456'));

    promise.then((res) => {

      expect(res.success).to.equal(true);
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
