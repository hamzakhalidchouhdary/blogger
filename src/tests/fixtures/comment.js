const CommentModel = require('../../app/models').Comment;

const getCommentCount = async function (articleId) {
  return CommentModel.count({ where: { articleId } });
};

module.exports = {
  getCommentCount
}