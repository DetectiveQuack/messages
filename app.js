/**
 * @author Saffaanh Soobratty
 * 
 * Server to post and get a message as plain text
 */
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/messages', require('./app/routes/messages'));

app.all('/', (req, res) => {
  res.send('Welcome to messages!!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`); //eslint-disable-line no-console
});

module.exports = app;