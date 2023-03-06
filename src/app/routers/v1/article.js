const HTTP_STATUS = require('../../utils/constants/httpStatus');
const router = require('express').Router();
const ArticlePostService = require('../../apis/articlePostService');

router.post('/', ArticlePostService.createPost);
router.put('/', ArticlePostService.updatePost);
router.get('/', ArticlePostService.getPosts);
router.get('/:id', ArticlePostService.getPost);
router.delete('/', ArticlePostService.deletePost);

module.exports = router;