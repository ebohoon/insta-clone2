const express = require('express');
const router = express.Router();
<<<<<<< HEAD

const {
    getAllPostings,
    postPostings,
} = require('./controller/main.js');

const {
    authMiddleware
} = require('../middlewares/authMiddleware.js');
const {
    uploadImage
} = require('../middlewares/imageUploadMiddleware.js');


router
    .route("/view")
    .get(getAllPostings)


router
    .route("/post")
    .post(authMiddleware, uploadImage, postPostings);





=======
const authUser = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const { GetMainPosting, CreatePosting } = require('./controller/main');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../upload'));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});
const upload = multer({ storage: storage });

router
  .route('/')
  // 게시물 전체 불러오기
  //   .get(authUser, GetMainPosting)
  //게시물 작성
  .post(authUser, upload.single('image'), CreatePosting);
>>>>>>> 2daf4c5eb694f787275b07a55639c622fa8f8dad

module.exports = router;
