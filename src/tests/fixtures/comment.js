const CommentModel = require('../../app/models').Comment;
const { faker } = require('@faker-js/faker');
const _ = require('lodash');

const getCommentCount = async function (articleId) {
  return CommentModel.count({ where: { articleId } });
};

const createComment = async function (content = '', articleId = null, userId = null) {
  if (_.isNull(articleId)) throw Object({ message: 'article id is missing' })
  if (_.isNull(userId)) throw Object({ message: 'user id is missing' })
  if (_.isEmpty(content)) {
    content = faker.random.words(7);
  }
  const commentDetails = { content, articleId, createdBy: userId, updatedBy: userId };
  return CommentModel.new(commentDetails);
}

const getCommentById = async function (commentId = null) {
  if (_.isNull(commentId)) throw Object({ message: 'comment id is missing' })
  return CommentModel.getById(commentId);
}

module.exports = {
  getCommentCount,
  createComment,
  getCommentById
}