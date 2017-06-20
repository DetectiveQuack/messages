const router = require('express').Router();

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isInteger(id) && id > 0) {
    return next();
  }

  throw new Error('Invalid id');
}, (req, res) => {
  res.send(req.params.id);
});

module.exports = router;