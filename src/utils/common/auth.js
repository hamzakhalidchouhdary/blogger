const bcrypt = require('bcrypt');

const generateHashedPassword = async function(plainString) {
  try {
    return bcrypt.hash(plainString, await bcrypt.genSalt(10));
  } catch (err) {
    console.error(err);
  }
}

const compareHashedPassword = async function(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  generateHashedPassword,
  compareHashedPassword
}