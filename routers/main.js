const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleWares/authMiddleware");
// const { mainView, boardPost } = require('./controller/main');

//이미지 파일 업로드
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage: storage });
//이미지 파일 업로드

router.post("/post", upload.single("image"), async (req, res) => {
    console.log('되나?')
  const { nickname } = req.body
  const { text } = req.body
  const createdAt = Date.now()
  const { image } = `../public/images/${req.file.filename}`; // image 경로 만들기
  const { like } = req.body;
  const { comment } = req.body;
  
  await main.create({ nickname, text, createdAt, image, like, comment });


//   const sql =
//     "INSERT INTO board(creator_id, title, content, passwd, image) values(?, ?, ?, ?, ?)";
//   connection.query(sql, datas, (err, rows) => {
//     if (err) {
//       console.error("err : " + err);
//     } else {
//       console.log("rows: " + JSON.stringify(rows));

    //   res.redirect("/board");
    // }
  });

// router.get("/view", authMiddleware, mainView);

module.exports = router;
