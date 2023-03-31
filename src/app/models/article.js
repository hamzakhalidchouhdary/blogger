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
    static new(articleDetails) {
      return this.create(
        articleDetails,
        { fields: ['title', 'content', 'createdBy', 'updatedBy'] }
      )
    }
    static modify(articleDetails, articleId) {
      return this.update(
        articleDetails,
        {
          where: {id: articleId},
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
    static findById(id) {
      return this.findOne({
        where: { id }
      });
    }
    static remove(id) {
      return this.destroy({
        where: {id}
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