'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // TODO: Add association here
    }
    static new(articleDetails) {
      return this.create(
        articleDetails,
        { fields: ['title', 'content', 'createdBy', 'updatedBy'] }
      )
    }
    static findLatest(limit = 1, where = {}) {
      return this.findOne({
        limit,
        where,
        order: [['createdAt', 'DESC']]
      });
    }
  }
  Article.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    createdBy: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: false,
      // references: {
      //   model: 'User',
      //   key: 'id'
      // }
    },
    updatedBy: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: false,
      // references: {
      //   model: 'User',
      //   key: 'id'
      // }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};