const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload"))
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname)) // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
})
const upload = multer({ storage: storage }).single("image")

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err })
    }
      let image = res.req.file.path
      let fileName = res.req.file.filename
      res.locals.image = image
      res.locals.fileName = fileName
      next()
  })
}