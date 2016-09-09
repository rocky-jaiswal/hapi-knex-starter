'use strict';

/* $lab:coverage:off$ */
const environment = process.env.NODE_ENV || 'development';
const config      = require('../../knexfile.js')[environment];

module.exports    = require('knex')(config);
/* $lab:coverage:on$ */
