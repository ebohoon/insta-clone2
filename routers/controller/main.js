// const postings = require("../../schema/posting");
// const multer = require("multer");
// const path = require("path");

// module.exports = {
//   mainView: async (req, res, next) => {

//   },
//   boardPost: async (req, res, next) => {
// //이미지 파일 업로드
//     var storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, "public/images/");
//         },
//         filename: function (req, file, cb) {
//           const ext = path.extname(file.originalname);
//           cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
//         },
//       });
      
//       var upload = multer({ storage: storage });

//     try {
//       const { nickname, text, createdAt, image, like, comment } = req.body;
//       await postings.create({ nickname, text, createdAt, image, like, comment });
//       res.send({ result: "success" });
//       return;
//     } catch (err) {
//       console.error(err);
//       res.status(400).send({ result: "fail" });
//     }
//   },
// };
