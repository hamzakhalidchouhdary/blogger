const router = require('express').Router();
const signup = require('./signup')
const login = require('./login');
const manageUser = require('./manageUser');
const manageProfile = require('./manageProfile');
const articles = require('./article');
const comment = require('./comment');
const { verifyJWT } = require('../../../utils/common/auth');
const { getUser } = require('../../modules/user');

const authorizeUser = async function(req, res, next) {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const {userId} = await verifyJWT(token);
    const user = await getUser(userId);
    next();
  } catch(err) {
    res.status(500).end();
  }
}

router.use('/auth/signup', signup);
router.use('/auth/login', login);
router.use(authorizeUser);
router.use('/user/manage', manageUser);
router.use('/user/profile', manageProfile);
router.use('/article', articles);
router.use('/article/:id/comment', comment);

module.exports = router;