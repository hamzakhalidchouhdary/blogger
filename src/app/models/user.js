'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { generateHashedPassword } = require('../../utils/common/auth');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    }
    static new(userDetails) {
      return this.create(
        userDetails,
        { fields: ['firstName', 'lastName', 'hashedPassword', 'username', 'role'] }
      );
    }
    static modify(userDetails, userId) {
      return this.update(
        userDetails,
        {
          where: {id: userId},
          // fields: ['firstName', 'lastName', 'username']
        }
      );
    }
    static findLatest(limit = 1, where = {}) {
      return this.findOne({
        limit,
        where,
        order: [['createdAt', 'DESC']]
      });
    }
    static findByUsername(username) {
      return this.findOne({
        where: { username }
      });
    }
    static findById(id) {
      return this.findOne({
        where: { id }
      });
    }
    instanceMethod() {
      console.log('This Is Instance Method');
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { msg: 'Must be alphabetic value' },
        notNull: { msg: 'first name can not be null' }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { msg: 'Must be alphabetic value' },
        notNull: { msg: 'last name can not be null' }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          msg: 'Must be alphabetic value',
          args: ['^[a-z0-9_\.-]+$', 'i']
        },
        notNull: { msg: 'username can not be null' }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'hashed password can not be empty',
        },
        notNull: { msg: 'hashed password can not be null' }
      }
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: 'manager',
      allowNull: false,
      values: ['admin', 'manager', 'reader'],
      // set(value) {
      //   this.setDataValue('role', value.toL);
      // },
      validate: {
        isIn: {
          msg: 'role must be one of the `Admin` | `Manager` | `Reader`',
          args: [['admin', 'manager', 'reader']]
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: async function (user) {
        const plainPassword = user.getDataValue('hashedPassword')
        const hashedPassword = await generateHashedPassword(plainPassword);
        user.setDataValue('hashedPassword', hashedPassword)
      }
    },
    indexes: [],
    sequelize,
    modelName: 'User',
  });
  return User;
};