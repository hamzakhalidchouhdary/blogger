const HTTP_STATUS = require("../utils/constants/httpStatus");

const signupNewUser = function(req, res) {
  try {
    res.status(HTTP_STATUS.CREATED).json({id: ''});
    return;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  signupNewUser
}