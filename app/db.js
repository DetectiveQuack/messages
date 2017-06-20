/**
 * DB configuration, uses environment variable for postgres db connection
 */
const pgp = require('pg-promise')({});

const db = pgp(process.env.DATABASE_URL);

module.exports = db;