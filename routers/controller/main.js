<<<<<<< HEAD
// const Joi = require('joi');
const Users = require("../../schema/users");
const Postings = require("../../schema/postings");
const printError = require("../../library/error");
=======
const Users = require("../../schema/users")
const Postings = require("../../schema/postings")
const printError = require("../../library/error")
>>>>>>> b7d3fc709d7abd9eb4716e3481a31d04b499d1aa

GetMainPosting = async (req, res, next) => {
  try {
    // 로그인한 유저가 쓴 다이어리만 가져오게 필터링
    const getPostings = await Postings.find()
    res.json(getPostings)
  } catch (err) {
    printError(req, err)
    next()
  }
}

CreatePosting = async (req, res, next) => {
  try {
<<<<<<< HEAD
    // Joi 검증 필요한지 확인하자??
    //ID로 찾아서 nickname을 가져올 지 아니면
    const userId = res.locals.user; //유저정보가져오기위한 수단 날짜생성
    const Finduser = await Users.findOne({ userId: userId });
    console.log(Finduser.nickname);

    const nickname = Finduser.nickname;
    const image = req.file.filename;
    const { text, image, createdAt } = req.body;
    await Postings.create({ nickname, text, image, comment, like });
    res.send({ result: "success", msg: "게시글 작성에 성공했습니다." });
  } catch (err) {
    res.send({ result: "fail", msg: "게시글 작성에 실패했습니다." });
=======
    //ID로 찾아서 nickname을 가져올 지 아니면
    const userId = res.locals.user //유저정보가져오기위한 수단 날짜생성
    console.log(userId)
    const Finduser = await Users.findOne({ userId: userId })
    const nickname = Finduser.nickname //작성자 닉네임 가져오기

    const { text, image, createdAt } = req.body
    console.log(text, image)
    await Postings.create({ nickname, text, image, createdAt })
    res.send({ result: "success", msg: "게시글 작성에 성공했습니다." })
  } catch (err) {
    res.send({ result: "fail", msg: "게시글 작성에 실패했습니다." })
>>>>>>> b7d3fc709d7abd9eb4716e3481a31d04b499d1aa

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
