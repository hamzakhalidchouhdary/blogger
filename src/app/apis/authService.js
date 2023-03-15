const UserModel = require("../models").User;
const { generateJWT } = require("../../utils/common/auth");
const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const signupNewUser = async function(req, res) {
  try {
    const { body: userDetails } = req;
    const newUser = await UserModel.new(userDetails);
    const jwToken = await generateJWT({userId: newUser.id});
    res.status(HTTP_STATUS.CREATED).json({token: jwToken});
    return;
  } catch (err) {
    ServiceResponse.error(res, {msg: ''})
  }
};

const loginUser = function(req, res) {
  try{
    res.status(HTTP_STATUS.OK).json({token: ''});
  } catch (err) {
    ServiceResponse.error(res, {msg: ''});
  };
};

module.exports = {
  signupNewUser,
  loginUser
}