const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authMiddleware');
const multer = require('../middlewares/multer');

const {
  GetMainPosting,
  CreatePosting,
  GetDetailPosting,
  CreateComment,
  GetComment,
  ClickedLike,
} = require('./controller/main');

router.route('/view').get(authUser, GetMainPosting);
// 게시물 전체 불러오기

router.route('/view/:postId').get(authUser, GetDetailPosting);
// 특정게시물 불러오기

router.route('/post').post(authUser, multer, CreatePosting);
//게시물 작성

router
  .route('/comment/:postId')
  //댓글 작성
  .post(authUser, CreateComment)
  //댓글 불러오기
  .get(authUser, GetComment);

router
  //좋아요
  .route('/like/:postId')
  .put(authUser, ClickedLike);
module.exports = router;
