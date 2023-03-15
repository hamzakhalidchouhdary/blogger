const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const createPost = function(req, res) {
  try {
    res.status(HTTP_STATUS.CREATED).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

const updatePost = function(req, res) {
  try {
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

const deletePost = function(req, res) {
  try {
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

const getPosts = function(req, res) {
  try {
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

const getPost = function(req, res) {
  try {
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, {});
  };
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts
};