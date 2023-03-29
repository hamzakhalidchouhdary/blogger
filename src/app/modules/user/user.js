const HTTP_STATUS = require("../../../utils/constants/httpStatus");
const ArticleModel = require('../../models').Article

function User(userDetails = {}) {

  Object.call(this, userDetails);

  this.id = userDetails.id || null;
  this.firstName = userDetails.firstName || '';
  this.lastName = userDetails.lastName || '';
  this.username = userDetails.username || '';
  this.role = userDetails.role || '';
  this.createUser = function () {
    throw Object({ message: 'not authorized to create new users', status: HTTP_STATUS.UNAUTHORIZED })
  };
  this.updateUser = function () {
    throw Object({ message: 'not authorized to create new users', status: HTTP_STATUS.UNAUTHORIZED })
  };
  this.deleteUser = function () {
    throw Object({ message: 'not authorized to create new users', status: HTTP_STATUS.UNAUTHORIZED })
  };
  this.createArticle = async function (articleDetails) {
    articleDetails.createdBy = articleDetails.updatedBy = this.id;
    return ArticleModel.new(articleDetails)
  };
  this.updateArticle = function (articleDetails, articleId) {
    articleDetails.updatedBy = this.id;
    return ArticleModel.modify(articleDetails, articleId);
  };
  this.deleteArticle = function () {
    throw Object({ message: 'not authorized to create new users', status: HTTP_STATUS.UNAUTHORIZED })
  };
  this.createComment = function () { };
  this.updateComment = function () { };
  this.deleteComment = function () { };
};

User.prototype = new Object();

module.exports = User;