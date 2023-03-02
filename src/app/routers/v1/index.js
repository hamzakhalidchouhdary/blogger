const router = require('express').Router();
const signup = require('./signup')

router.use('/auth/signup', signup);

module.exports = router;