const User = require('./user');
const UserModel = require('../../models').User;

function Admin(userDetails) {
  User.call(this, userDetails);

  this.createUser = async function (_userDetails) {
    return UserModel.new(_userDetails);
  };
  this.updateUser = async function (_userDetails, userId) {
    return UserModel.modify(_userDetails, userId);
  };
  this.deleteUser = async function (userId) {
    return UserModel.remove(userId);
  };
  this.deleteArticle = function () {
    return;
  };
}

Admin.prototype = new User();
Admin.prototype.role = 'admin';

module.exports = Admin;