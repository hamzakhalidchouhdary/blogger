const { verifyJWT } = require("../../../../utils/common/auth");
const HttpStatus = require("../../../../utils/constants/httpStatus");
const UserModule = require("../../../modules/user");

const authorizeUser = async function(req, res, next) {
  try{
    if (!req.headers.authorization) throw new Error('token not found');
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new Error('token not defined');
    const {userId} = await verifyJWT(token);
    const user = await UserModule.getUser(userId);
    next();
  } catch(err) {
    res.status(HttpStatus.UNAUTHORIZED).end(err.message);
  }
}

module.exports = {
  authorizeUser
}