'use strict';
const _ = require('lodash');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      models.Article.belongsTo(models.User, {
        foreignKey: 'createdBy'
      })
    }
    static async new(articleDetails = {}) {
      if(!_.isObject(articleDetails)) throw Object({message: 'article is not a object'});
      if (_.isEmpty(articleDetails)) throw Object({message: 'article details are empty'});
      return this.create(
        articleDetails,
        { fields: ['title', 'content', 'createdBy', 'updatedBy'] }
      )
    }
    static async modify(articleDetails = {}, articleId = null) {
      if (!_.isObject(articleDetails)) throw Object({message: 'article is not a object'})
      if (_.isEmpty(articleDetails)) throw Object({message: 'article details are empty'});
      if (!(_.isFinite(articleId) || articleId > 0)) throw Object({message: 'article id is invalid'});
      return this.update(
        articleDetails,
        {
          where: { id: articleId },
        }
      );
    }
    static async findLatest(limit = 1, where = {}) {
      if(!(_.isFinite(limit) || limit > 0)) throw Object({message: 'limit is invalid'});
      if (!_.isObject(where)) throw Object({message: 'where is not a object'});
      return this.findOne({
        limit,
        where,
        order: [['createdAt', 'DESC']]
      });
    }
    static async findById(id = null) {
      if(!(_.isFinite(id) || id > 0)) throw Object({message: 'id is invalid'});
      return this.findOne({
        where: { id }
      });
    }
    static async remove(id = null) {
      if(!(_.isFinite(id) || id > 0)) throw Object({message: 'id is invalid'}) 
      return this.destroy({
        where: { id }
      })
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
      unique: false
    },
    updatedBy: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: false
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