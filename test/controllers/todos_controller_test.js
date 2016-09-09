'use strict';

const Code       = require('code');
const Lab        = require('lab');
const lab        = exports.lab = Lab.script();
const { expect } = Code;
const { describe, it, after } = lab;

const Sinon   = require('sinon');
const Promise = require('bluebird');
const JWT     = require('jsonwebtoken');
const Config  = require('config');
const Server  = require('../../');
const Token   = require('../../lib/models/token');
const Todo    = require('../../lib/models/todo');

describe('get / index', () => {

  let options = {
    method: 'GET',
    url: '/todos'
  };

  it('fails in case of no token', (done) => {

    Server.inject(options, (response) => {

      const result = response.result;

      Code.expect(response.statusCode).to.equal(401);
      Code.expect(result).to.be.instanceof(Object);

      done();
    });
  });

  it('responds with success in case of valid token', (done) => {

    const validJWT = { 'Authorization': Token.generate(1) };
    options = Object.assign(options, { headers: validJWT });
    Server.inject(options, (response) => {

      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result).to.be.instanceof(Object);

      done();
    });
  });

  it('fails in case of invalid token', (done) => {

    const validJWT = { 'Authorization': JWT.sign({ foo: 'bar' }, Config.get('token.secret')) };
    options = Object.assign(options, { headers: validJWT });
    Server.inject(options, (response) => {

      const result = response.result;

      Code.expect(response.statusCode).to.equal(401);
      Code.expect(result).to.be.instanceof(Object);

      done();
    });
  });
});

describe('post / create', () => {

  let options = {
    method: 'POST',
    url: '/todos',
    payload: { todo: {} }
  };

  const mock = Sinon.mock(Todo);

  it('responds with success in case of valid token', (done) => {

    mock.expects('create').once().returns(Promise.resolve([]));

    const validJWT = { 'Authorization': Token.generate(1) };
    options = Object.assign(options, { headers: validJWT });

    Server.inject(options, (response) => {

      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('responds with failure in case of invalid todo', (done) => {

    mock.expects('create').once().returns(Promise.reject([]));

    const validJWT = { 'Authorization': Token.generate(1) };
    options = Object.assign(options, { headers: validJWT });

    Server.inject(options, (response) => {

      expect(response.statusCode).to.equal(500);
      done();
    });
  });

  after((done) => {

    mock.restore();
    done();
  });
});
