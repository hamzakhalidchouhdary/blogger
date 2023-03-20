const User = require('./user');

function Admin(userDetails) {
  User.call(this, userDetails);

  this.createUser = function () {
    console.log('user created');
  };
  this.updateUser = function() {
    console.log('user updated');
  };
  this.deleteUser = function() {
    console.log('user deleted');
  };
}

Admin.prototype = new User();
Admin.prototype.role = 'admin';

module.exports = User;