const ServiceResponse = require("../utils/common/serviceResponse");
const HTTP_STATUS = require("../utils/constants/httpStatus");

const createComment = function(req, res) {
  try {
    res.status(HTTP_STATUS.CREATED).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

const updateComment = function(req, res) {
  try {
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

const deleteComment = function(req, res) {
  try {
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

const getComment = function(req, res) {
  try {
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment
};