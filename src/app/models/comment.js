'use strict';
const {
  Model
} = require('sequelize');
const _ = require('lodash');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {

    }
    static new(commentDetails) {
      return this.create(commentDetails, {
        fields: ['content', 'createdBy', 'updatedBy', 'articleId']
      });
    }
    static getById(id = null) {
      if (_.isNull(id)) throw Object({ message: 'comment id is missing' })
      return this.findOne({ where: { id } });
    }
    static modify(content = '', id = null) {
      if (_.isNull(id)) throw Object({ message: 'comment id is missing' })
      if (_.isEmpty(content)) throw Object({ message: 'content can not be empty' })

      this.update({ content }, { where: { id } });
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