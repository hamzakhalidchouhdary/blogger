const router = require('express').Router();
const version1 = require('./v1/index');

router.use('/api/v1', version1);
router.use('', (req, res) => {
  res.status(400).end();
  return;
});

module.exports = router;
