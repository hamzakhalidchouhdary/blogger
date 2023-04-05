'use strict';
const {
  Model
} = require('sequelize');
const _ = require('lodash');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {

    }
    static async new(commentDetails) {
      return this.create(commentDetails, {
        fields: ['content', 'createdBy', 'updatedBy', 'articleId']
      });
    }
    static async getById(id = null) {
      if (_.isNull(id)) throw Object({ message: 'comment id is missing' })
      return this.findOne({ where: { id } });
    }
    static async modify(content = '', id = null, ownerId = null) {
      if (_.isNull(id)) throw Object({ message: 'comment id is missing' })
      if (_.isNull(id)) throw Object({ message: 'owner id is missing' });
      if (_.isEmpty(content)) throw Object({ message: 'content can not be empty' })

      const commentDetails = await this.getById(id);
      if (commentDetails.createdBy != ownerId){
        throw Object({ message: 'can not modify others user comments', status: HTTP_STATUS.NOT_ALLOWED });
      }


      this.update({ content }, { where: { id, updatedBy: ownerId } });
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