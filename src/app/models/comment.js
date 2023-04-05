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
    static async new(commentDetails = {}) {
      if(!_.isObject(commentDetails)) throw Object({message: 'comment details is not a object'});
      if(_.isEmpty(commentDetails)) throw Object({message: 'comment details can not be empty'});
      return this.create(commentDetails, {
        fields: ['content', 'createdBy', 'updatedBy', 'articleId']
      });
    }
    static async getById(id = null) {
      if (!(_.isFinite(id) || id > 0)) throw Object({ message: 'comment id is invalid' })
      return this.findOne({ where: { id } });
    }
    static async modify(content = '', id = null, ownerId = null) {
      if (!(_.isFinite(id) || id > 0)) throw Object({ message: 'comment id is invalid' })
      if (!(_.isFinite(ownerId) || ownerId > 0)) throw Object({ message: 'owner id is invalid' });
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