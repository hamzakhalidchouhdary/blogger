const router = require('express').Router();
const signup = require('./signup')
const login = require('./login');
const manageUser = require('./manageUser');
const manageProfile = require('./manageProfile');
const articles = require('./article');
const comment = require('./comment');

router.use('/auth/signup', signup);
router.use('/auth/login', login);
router.use('/user/manage', manageUser);
router.use('/user/profile', manageProfile);
router.use('/article', articles);
router.use('/article/:id/comment', comment);

module.exports = router;