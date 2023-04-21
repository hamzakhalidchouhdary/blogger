const RouteValidator = require('express-route-validator')
const { validationResult, ValidationChain, body } = require('express-validator');
const serviceResponse = require('../../../../../utils/common/serviceResponse');
const HTTP_STATUS = require('../../../../../utils/constants/httpStatus');

const newArticle_ = RouteValidator.validate({
  body: {
    title: {isRequired: true, message: 'Article title is required'},
    content: {isRequired: true, message: 'Article content is required'}
  },
  errorHandler: function(err, req, res, next) {
    if(err) {
      console.log(err.message);
      return res.status(400).end(err);
    }
    next();
  }
});

const newArticle = async function (req, res, next) {
  try {
    const validationRules = [
      body('title')
      .exists({checkFalsy: true, checkNull: true})
      .withMessage('Article title is required')
      .trim().isEmpty().withMessage('Article title can not be empty'),
      body('content')
      .exists().withMessage('Article content is required')
      .trim().isEmpty().withMessage('Article content can not be empty')
    ]
    await Promise.all(validationRules.map(rule => rule.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    throw errors.array();
  } catch (err) {
    serviceResponse.error(res, {message: err, status: HTTP_STATUS.BAD_REQUEST});
    return;
  }
}
  
module.exports = {
  newArticle,
};
