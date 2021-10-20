const Users = require("../../schema/users")
const Postings = require("../../schema/postings")
const printError = require("../../library/error")

GetMainPosting = async (req, res, next) => {
  try {
    const getPostings = await Postings.find().sort("-createdAt")
    console.log(getPostings)
    res.json(getPostings)
  } catch (err) {
    console.log("캐치 에러")
    printError(req, err)
    next()
  }
}

CreatePosting = async (req, res, next) => {
  try {
    const userId = res.locals.user //유저정보가져오기위한 수단 날짜생성
    const Finduser = await Users.findOne({ userId: userId })
    const nickname = Finduser.nickname //작성자 닉네임 가져오기
    const { text, createdAt } = req.body
    const image = `http://3.34.139.137/${res.locals.fileName}`
    await Postings.create({ nickname, text, createdAt, image })
    res.send({ result: "success", msg: "게시글 작성에 성공했습니다." })
  } catch (err) {
    res.send({ result: "fail", msg: "게시글 작성에 실패했습니다." })
    printError(req, err)
    next()
  }
}

// 특정 다이어리 불러오기
GetDetailPosting = async (req, res, next) => {
  try {
    const diaryData = await Diaries.find({
      userID: res.locals.user,
      date: req.query.date,
    })
    res.json(diaryData)
  } catch (err) {
    printError(req, err)
    next(err)
  }
}

module.exports = {
  GetMainPosting,
  CreatePosting,
}
