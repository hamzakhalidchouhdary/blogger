const UserModel = require('../../models/index').User;
const Admin = require('./admin');
const Manager = require('./manager');
const Reader = require('./reader');
const User = require('./user');

module.exports = {
  getUser: async function(userId) {
    const userDetails = await UserModel.findById(userId);
    let user = {};
    switch(userDetails.role) {
      case 'admin':
        user = new Admin(userDetails);
        break;
      case 'manager':
        user = new Manager(userDetails);
        break;
      case 'reader':
        user = new Reader(userDetails);
        break;
      default:
        user = new User(userDetails);
    }
    return user;
  }
}
