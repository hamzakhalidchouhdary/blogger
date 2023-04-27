const HTTP_STATUS = require("../../../utils/constants/httpStatus");
const router = require("express").Router({ mergeParams: true });
const ArticleCommentService = require("../../apis/articleCommentService");
const CommentValidation = require("./middleware/validations/comments");

router.post("/", CommentValidation.newComment, ArticleCommentService.createComment);
router.put("/:id", ArticleCommentService.updateComment);
router.get("/", ArticleCommentService.getComment);
router.get("/list", ArticleCommentService.getCommentList);
router.delete("/:id", ArticleCommentService.deleteComment);

module.exports = router;
