const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const createPost = async function (req, res) {
  try {
    const { user, body: articleDetails } = req;
    const newArticle = await user.createArticle(articleDetails);
    res.status(HTTP_STATUS.CREATED).json(newArticle);
    return;
  } catch (err) {
    console.log(err);
    ServiceResponse.error(res, err);
  };
};

const updatePost = function (req, res) {
  try {
    const { user } = req;
    user.updateArticle();
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

const deletePost = function (req, res) {
  try {
    const { user } = req;
    user.deleteArticle();
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

const getPosts = function (req, res) {
  try {
    const { user } = req;
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

const getPost = function (req, res) {
  try {
    const { user } = req;
    res.status(HTTP_STATUS.OK).json({});
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
  };
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts
};