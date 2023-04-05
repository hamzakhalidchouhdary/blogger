'use strict';
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
    static async new(articleDetails) {
      return this.create(
        articleDetails,
        { fields: ['title', 'content', 'createdBy', 'updatedBy'] }
      )
    }
    static async modify(articleDetails, articleId) {
      return this.update(
        articleDetails,
        {
          where: { id: articleId },
        }
      );
    }
    static async findLatest(limit = 1, where = {}) {
      return this.findOne({
        limit,
        where,
        order: [['createdAt', 'DESC']]
      });
    }
    static async findById(id) {
      return this.findOne({
        where: { id }
      });
    }
    static async remove(id) {
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