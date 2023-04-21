const { validationResult, body } = require("express-validator");
const serviceResponse = require("../../../../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../../../../utils/constants/httpStatus");

const newArticle = async function (req, res, next) {
  try {
    const validationRules = [
      body("title")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage("Article title is required")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Article title can not be empty"),
      body("content")
        .exists()
        .withMessage("Article content is required")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Article content can not be empty"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    throw errors.array();
  } catch (err) {
    serviceResponse.error(res, {
      message: err,
      status: HTTP_STATUS.BAD_REQUEST,
    });
    return;
  }
};

module.exports = {
  newArticle,
};
