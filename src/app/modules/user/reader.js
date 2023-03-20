const User = require('./user');

function Reader(userDetails) {
  User.call(this, userDetails);
}

Reader.prototype = new User();
Reader.prototype.role = 'reader';

module.exports = Reader;
