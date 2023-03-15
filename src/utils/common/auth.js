const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateHashedPassword = async function(plainString) {
  try {
    return bcrypt.hash(plainString, await bcrypt.genSalt(10));
  } catch (err) {
    throw err;
  }
}

const compareHashedPassword = async function(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

const generateJWT = async function(payload) {
  try {
    return jwt.sign(payload, '12345');
  } catch (err) {
    throw err;
  }
}

const verifyJWT = async function(token) {
  try {
    return jwt.verify(token, '12345', function(err, payload) {
      if (err) throw err;
      return payload;
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  generateHashedPassword,
  compareHashedPassword,
  generateJWT,
  verifyJWT
}