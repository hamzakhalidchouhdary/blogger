const router = require('express').Router();
const signup = require('./signup')
const login = require('./login');
const manageUser = require('./manageUser');
const manageProfile = require('./manageProfile');
const articles = require('./article');
const comment = require('./comment');
const { verifyJWT } = require('../../../utils/common/auth');
const { getUser } = require('../../modules/user');

const authorizeUser = function(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  verifyJWT(token)
    .then(({userId}) => {
      getUser(userId).then(user => {
        req.user = user
        next();
      })
    })
    .catch(err => {
      res.status(500).end();
  });
}

router.use('/auth/signup', signup);
router.use('/auth/login', login);
router.use(authorizeUser);
router.use('/user/manage', manageUser);
router.use('/user/profile', manageProfile);
router.use('/article', articles);
router.use('/article/:id/comment', comment);

module.exports = router;