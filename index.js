'use strict';

const Hapi          = require('hapi');
const Config        = require('config');
const HapiAuthJWT   = require('hapi-auth-jwt2');
const Routes        = require('./lib/routes/');
const Token         = require('./lib/models/token');
const LoggingConfig = require('./lib/middlewares/logging_config');

// Create a server with a host and port
const server = new Hapi.Server();

// Logging setup
const goodOptions = { reporters: LoggingConfig, includes: { request: ['headers'] } };

// Server config
server.connection({ port:   Config.get('api.port'),
                    routes: { cors: Config.get('api.cors') }
                  });

// Auth
/* $lab:coverage:off$ */
server.register([HapiAuthJWT, { register: require('good'), options: goodOptions }], (err) => {

  if (err) {
    console.error(err);
  }

  server.auth.strategy('jwt', 'jwt', { key: Config.get('token.secret'),
                                       validateFunc: Token.validate,
                                       verifyOptions: { algorithms: ['HS256'] }
                                     });

  server.auth.default('jwt');

  // Add the routes
  server.route(Routes.config);
});
/* $lab:coverage:on$ */

// Start the server
server.start(() => {

  console.log('Server running at:', server.info.uri);
});

module.exports = server;
