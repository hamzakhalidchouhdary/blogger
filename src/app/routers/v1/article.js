const HTTP_STATUS = require("../../../utils/constants/httpStatus");
const router = require("express").Router();
const ArticlePostService = require("../../apis/articlePostService");

router.post("/", ArticlePostService.createPost);
router.put("/:id", ArticlePostService.updatePost);
router.get("/list", ArticlePostService.getPosts);
router.get("/:id", ArticlePostService.getPost);
router.delete("/:id", ArticlePostService.deletePost);

module.exports = router;
