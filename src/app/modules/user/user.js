const HTTP_STATUS = require("../../../utils/constants/httpStatus");
const ArticleModel = require('../../models').Article
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
    if (_.isEmpty(articleDetails)) throw Object({ message: 'createArticle: article details can not be empty' });
    articleDetails.createdBy = articleDetails.updatedBy = this.id;
    return ArticleModel.new(articleDetails)
  };
  this.updateArticle = function (articleDetails, articleId) {
    if (_.isEmpty(articleDetails)) throw Object({ message: 'updateArticle: article details can not be empty' });
    if (!articleId) throw Object({ message: 'updateArticle: article id is not specified' });
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