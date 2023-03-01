const HTTP_STATUS = require("../constants/httpStatus");
const RESPONSE_TEXT = require("../constants/responeText");

const errorResponse = function(res, {error, status}) {
  res.status(status || HTTP_STATUS.INTERNAL_ERROR).send(error || RESPONSE_TEXT.INTERNAL_ERROR);
};

module.exports = {
  error: errorResponse
}