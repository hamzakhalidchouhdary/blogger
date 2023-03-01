const HTTP_STATUS = require("../constants/httpStatus");

const errorResponse = function(res, {error, status}) {
  res.status(status || HTTP_STATUS.INTERNAL_ERROR).send(error || 'internal error');
};

module.exports = {
  error: errorResponse
}