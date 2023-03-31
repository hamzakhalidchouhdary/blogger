const User = require('./user');
const UserModel = require('../../models').User;
const ArticleModel = require('../../models').Article;
const _ = require('lodash');

function Admin(userDetails) {
  User.call(this, userDetails);

  this.createUser = async function (_userDetails) {
    if (_.isEmpty(_userDetails)) throw Object({ message: 'createUser: user details can not be empty' });
    return UserModel.new(_userDetails);
  };
  this.updateUser = async function (_userDetails, userId) {
    if (_.isEmpty(_userDetails)) throw Object({ message: 'updateUser: user details can not be empty' });
    if (!userId) throw Object({ message: 'updateUser: user id is not specified' });
    return UserModel.modify(_userDetails, userId);
  };
  this.deleteUser = async function (userId) {
    if (!userId) throw Object({ message: 'deleteUser: user id is not specified' });
    return UserModel.remove(userId);
  };
  this.deleteArticle = function (articleId) {
    if (!articleId) throw Object({ message: 'deleteArticle: article id is not specified' });
    return ArticleModel.remove(articleId);
  };
}

Admin.prototype = new User();
Admin.prototype.role = 'admin';

module.exports = Admin;