const RouteValidator = require('express-route-validator')

const newArticle = RouteValidator.validate({
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

module.exports = {
  newArticle,
};
