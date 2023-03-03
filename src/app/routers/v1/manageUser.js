const router = require('express').Router();

router.post('/new', (req, res) => {
  res.status(201).end();
});
router.put('/:id', (req, res) => {
  res.status(200).end();
});
router.delete('/:id', (req, res) => {
  res.status(200).end();
});
router.get('/:id', (req, res) => {
  res.status(200).end();
});


module.exports = router;