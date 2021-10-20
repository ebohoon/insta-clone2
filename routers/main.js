const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authMiddleware");
const multer = require("../middlewares/multer");

const {
  GetMainPosting,
  CreatePosting,
  CreateComment,
  GetDetailPosting,
} = require("./controller/main");

router.route("/view").get(authUser, GetMainPosting);
// 게시물 전체 불러오기

router.route("/view/:postId").get(authUser, GetDetailPosting);
// 특정게시물 불러오기

router.route("/post").post(authUser, multer, CreatePosting);
//게시물 작성

router.route("/comment/:postId").post(authUser, CreateComment);
//댓글 작성

module.exports = router;
