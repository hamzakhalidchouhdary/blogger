function User (userDetails = {}) {

  Object.call(this, userDetails);
  
  this.firstName = userDetails.firstName || '';
  this.lastName = userDetails.lastName || '';
  this.username = userDetails.username || '';
  this.role = userDetails.role || '';
  this.createUser = function () {
    throw new Error('not authorized to create new users')
  };
  this.updateUser = function() {
    throw new Error('not authorized to modify users')
  };
  this.deleteUser = function() {
    throw new Error('not authorized to delete users')
  };
  this.createArticle = function() {
    throw new Error('not authorized to create new articles')
  };
  this.updateArticle = function() {
    throw new Error('not authorized to modify articles')
  };
  this.deleteArticle = function() {
    throw new Error('not authorized to delete articles')
  };
  this.createComment = function() {};
  this.updateComment = function() {};
  this.deleteComment = function() {};
};

User.prototype = new Object();

module.exports = User;