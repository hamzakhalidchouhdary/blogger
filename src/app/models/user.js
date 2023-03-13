'use strict';
const {
  Model
} = require('sequelize');
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
    static findLatest(limit = 1, where = {}) {
      return this.findOne({
        limit,
        where,
        order: [ [ 'createdAt', 'DESC' ]]
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
        isAlpha: { msg: 'Must be alphabetic value'},
        notNull: { msg: 'first name can not be null'}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { msg: 'Must be alphabetic value'},
        notNull: { msg: 'last name can not be null'}
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
        notNull: { msg: 'username can not be null'}
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
        set(value) {
          this.setDataValue('hashedPassword', value);
        },
        validate: {}
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values:['admin', 'manager', 'reader'],
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
    hooks: {},
    indexes: [],
    sequelize,
    modelName: 'User',
  });
  return User;
};