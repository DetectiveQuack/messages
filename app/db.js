/**
 * DB configuration, uses environment variable for postgres db connection
 */
const pgp = require('pg-promise')({
  noLocking: process.env.NODE_ENV === 'test'
});

const db = pgp(process.env.DATABASE_URL);

module.exports = db;