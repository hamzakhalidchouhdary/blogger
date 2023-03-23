const UserModel = require('../../models/index').User;
const USER_ROLES = require('../../../utils/constants/userRoles');
const Admin = require('./admin');
const Manager = require('./manager');
const Reader = require('./reader');
const User = require('./user');

module.exports = {
  getUser: async function(userId) {
    const userDetails = await UserModel.findById(userId);
    let user = {};
    switch(userDetails.role) {
      case USER_ROLES.ADMIN:
        user = new Admin(userDetails);
        break;
      case USER_ROLES.MANAGER:
        user = new Manager(userDetails);
        break;
      case USER_ROLES.READER:
        user = new Reader(userDetails);
        break;
      default:
        user = new Manager(userDetails);
    }
    return user;
  }
}
