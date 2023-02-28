const router = require('express').Router();

router.post('/', (req, res) => {
  res.status(200).end();
  return;
})

router.get('/', (req, res) => {
  res.status(405).end();
  return;
});

module.exports = router;