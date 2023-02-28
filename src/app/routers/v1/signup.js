const HTTP_STATUS = require('../../utils/constants/httpStatus');
const router = require('express').Router();

router.post('/', (req, res) => {
  res.status(HTTP_STATUS.OK).end();
  return;
})

router.use('/', (req, res) => {
  res.status(HTTP_STATUS.NOT_ALLOWED).end();
  return;
});

module.exports = router;