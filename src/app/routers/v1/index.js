const router = require('express').Router();
const signup = require('./signup')
const login = require('./login');
const manageUser = require('./manageUser');

router.use('/auth/signup', signup);
router.use('/auth/login', login);
router.use('/user/manage', manageUser);

module.exports = router;