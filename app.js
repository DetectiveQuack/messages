/**
 * @author Saffaanh Soobratty
 * 
 * Server to post and get a message as plain text
 */
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/message', require('./app/routes/message'));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});