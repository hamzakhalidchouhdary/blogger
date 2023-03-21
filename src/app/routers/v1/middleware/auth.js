const { verifyJWT } = require("../../../../utils/common/auth");
const { getUser } = require("../../../modules/user");

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

module.exports = {
  authorizeUser
}