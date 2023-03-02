const ServiceResponse = require("../utils/common/serviceResponse");
const HTTP_STATUS = require("../utils/constants/httpStatus");

const signupNewUser = function(req, res) {
  try {
    res.status(HTTP_STATUS.CREATED).json({id: ''});
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