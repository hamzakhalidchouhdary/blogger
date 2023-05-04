const { validationResult, body } = require("express-validator");
const serviceResponse = require("../../../../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../../../../utils/constants/httpStatus");
const { evaluateValidationRules } = require("./");

const newProfile = async function (req, res, next) {
  try {
    const validationRule = [
      body("firstName")
        .notEmpty()
        .withMessage("First name can not be empty"),
      body("lastName").notEmpty().withMessage("Last name can not be empty"),
      body("username").notEmpty().withMessage("username can not be empty"),
      body("hashedPassword")
        .notEmpty()
        .withMessage("Password can not be empty"),
    ];
    await evaluateValidationRules(validationRule, req);
    return next();
  } catch (err) {
    serviceResponse.error(res, {
      message: err,
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }
};

module.exports = {
  newProfile,
};
