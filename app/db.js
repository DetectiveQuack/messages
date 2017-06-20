const pgp = require('pg-promise');
const local = require('../config/local.json');

const cn = local[process.env.NODE_ENV].server;

const db = pgp(cn);

module.exports = db;