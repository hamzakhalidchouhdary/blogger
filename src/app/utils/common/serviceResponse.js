const HTTP_STATUS = require("../constants/httpStatus");

const errorResponse = function(res, {error, status}) {
  res.status(status).send(error);
};

module.exports = {
  error: errorResponse
}