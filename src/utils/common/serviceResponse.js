const HTTP_STATUS = require("../constants/httpStatus");
const RESPONSE_TEXT = require("../constants/errorText");

const errorResponse = function (res, { message, status }) {
  res
    .status(status || HTTP_STATUS.INTERNAL_ERROR)
    .send(message || RESPONSE_TEXT.INTERNAL_ERROR);
};

const errorResponseMW = function (err, req, res, next) {
  const status = err.status || res.statusCode || HTTP_STATUS.INTERNAL_ERROR;
  const message = err.message || err || RESPONSE_TEXT.INTERNAL_ERROR;
  return res
    .status(status)
    .send(message);
};

module.exports = {
  error: errorResponse,
  errorMW: errorResponseMW
};
