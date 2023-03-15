const HTTP_STATUS = require('../../../utils/constants/httpStatus');
const router = require('express').Router();
const ArticleCommentService = require('../../apis/articleCommentService');

router.post('/', ArticleCommentService.createComment);
router.put('/', ArticleCommentService.updateComment);
router.get('/', ArticleCommentService.getComment);
router.delete('/', ArticleCommentService.deleteComment);

module.exports = router;