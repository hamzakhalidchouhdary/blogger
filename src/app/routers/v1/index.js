const router = require('express').Router();
const signup = require('./signup')
const login = require('./login');

router.use('/auth/signup', signup);
router.use('/auth/login', login);

module.exports = router;