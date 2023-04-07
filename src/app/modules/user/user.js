const HTTP_STATUS = require("../../../utils/constants/httpStatus");
const ArticleModel = require('../../models').Article
const CommentModel = require('../../models').Comment
const _ = require('lodash');

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
  this.createComment = async function (content = '', articleId = null) {
    const commentObj = { content, articleId, createdBy: this.id, updatedBy: this.id };
    return CommentModel.new(commentObj);
  };
  this.updateComment = function (content = '', commentId = null) {
    return CommentModel.modify(content, commentId, this.id);
  };
  this.deleteComment = async function (commentId = null) { 
    return CommentModel.remove(commentId, this.id);
  };
};

User.prototype = new Object();

module.exports = User;