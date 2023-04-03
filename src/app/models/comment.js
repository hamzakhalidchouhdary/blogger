'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {

    }
    static new(commentDetails) {
      return this.create(commentDetails, {
        fields: ['content', 'createdBy', 'updatedBy', 'articleId']
      });
    }
  };
  Comment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};