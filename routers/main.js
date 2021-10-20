const express = require("express")
const router = express.Router()
const authUser = require("../middlewares/authMiddleware")
const multer = require("../middlewares/multer")

const { GetMainPosting, CreatePosting } = require("./controller/main")

router
  .route("/view")
  // 게시물 전체 불러오기
  .get(authUser, GetMainPosting)
router
  .route("/post")
  //게시물 작성
  .post(authUser, multer, CreatePosting)

module.exports = router