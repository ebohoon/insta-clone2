const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authMiddleware');
const { GetMainPosting, CreatePosting } = require('./controller/main');

router
  .route('/')
  // 게시물 전체 불러오기
  //   .get(authUser, GetMainPosting)
  //게시물 작성
  .post(authUser, CreatePosting);

module.exports = router;
