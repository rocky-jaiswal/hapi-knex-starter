'use strict';

const Code = require('code');
const Lab  = require('lab');
const lab  = exports.lab = Lab.script();
const { describe, it, after } = lab;
const { expect } = Code;
const Sinon = require('sinon');

const Server  = require('../../');
const User    = require('../../lib/models/user');

const mock = Sinon.mock(User);

describe('auth succeeds', () => {

  const options = {
    method: 'POST',
    url: '/auth',
    payload: { email: 'foo@example.com', password: '123456' }
  };

  mock.expects('validateLogin').twice().returns(new Promise((resolve, reject) => {

    resolve({ success: true });
  }));

  it('in case of good login credentials', (done) => {

    Server.inject(options, (response) => {

      expect(response.statusCode).to.equal(200);
      expect(response.result).to.include('token');

      done();
    });
  });

  after((done) => {

    mock.restore();
    done();
  });

});

describe('auth fails', () => {

  const options = {
    method: 'POST',
    url: '/auth',
    payload: { username: 'foo@example.com', password: '123456' }
  };

  mock.expects('validateLogin').twice().returns(new Promise((resolve, reject) => {

    reject({ message: 'failed' });
  }));

  it('in case of bad login credentials', (done) => {

    Server.inject(options, (response) => {

      expect(response.statusCode).to.equal(403);
      expect(response.result).to.be.instanceof(Object);

      done();
    });
  });

  after((done) => {

    mock.restore();
    done();
  });

});
