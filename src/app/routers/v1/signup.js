const router = require('express').Router();

router.post('/', (req, res) => {
  res.status(200).end();
  return;
})

module.exports = router;