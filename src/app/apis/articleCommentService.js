const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const createComment = function (req, res) {
  try {
    const { user } = req;
    user.createComment();
    res.status(HTTP_STATUS.CREATED).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

const updateComment = function (req, res) {
  try {
    const { user } = req;
    user.updateComment();
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

const deleteComment = function (req, res) {
  try {
    const { user } = req;
    user.deleteComment();
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

const getComment = function (req, res) {
  try {
    const { user } = req;
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment
};