/**
 * Messages routes
 */

const router = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../db');

/**
 * Get message via id
 * example usage:
 *  curl $domain/messages/12345
 */
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isInteger(id) && id > 0) {
    return next();
  }

  throw new Error('Invalid id');
}, (req, res) => {
  const id = parseInt(req.params.id, 10);

  res.type('text/plain');

  db.one('SELECT message from messages WHERE id = $1', [id])
    .then((data) => {
      res.send(data.message);
    })
    .catch(() => {
      res.send(`Message does not exist with id: ${id}`);
    });
});

/**
 * Post message to db using url encoded content type
 * 
 * example usage:
 *  curl $domain/messages/12345 -d 'my test message to store'
 */
router.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
  // data comes as { 'message': '' }
  const keys = Object.keys(req.body);

  if (!keys.length) {
    throw new Error('No message found');
  }

  // At this point we know there is at least one
  const text = keys[0];

  res.type('json');

  db.one('INSERT INTO messages (message) VALUES($1) RETURNING id', [text], (event) => event.id)
    .then((id) => res.json({ id }))
    .catch(() => {
      // Hard code to not show sensitive database information on error
      res.json({ error: 'Oops something went wrong...' });
    });

});

module.exports = router;