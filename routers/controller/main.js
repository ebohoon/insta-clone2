// const Joi = require('joi');
const Users = require('../../schema/users');
const Postings = require('../../schema/postings');
const printError = require('../../library/error');

GetMainPosting = async (req, res, next) => {
  try {
    const date = request.query.date;
    // 로그인한 유저가 쓴 다이어리만 가져오게 필터링
    const getPostings = await Postings.find();
    res.json(getPostings);
  } catch (err) {
    printError(req, err);
    next();
  }
};

CreatePosting = async (req, res, next) => {
  try {
    // Joi 검증 필요한지 확인하자??
    //ID로 찾아서 nickname을 가져올 지 아니면
    const userId = res.locals.user; //유저정보가져오기위한 수단 날짜생성
    const Finduser = await Users.findOne({ userId: userId });
    console.log(Finduser.nickname); //작성자 닉네임 가져오기
    // const { text, image } = req.body;
    const { nickname, text, createdAt, image, comment, like } = req.body;
    await Postings.create({ nickname, text, createdAt, image, comment, like });
    res.send({ result: 'success', msg: '게시글 작성에 성공했습니다.' });
  } catch (err) {
    res.send({ result: 'fail', msg: '게시글 작성에 실패했습니다.' });

    printError(req, err);
    next();
  }
};

// 특정 다이어리 불러오기
GetDetailPosting = async (req, res, next) => {
  try {
    const diaryData = await Diaries.find({
      userID: res.locals.user,
      date: req.query.date,
    });
    res.json(diaryData);
  } catch (err) {
    printError(req, err);
    next(err);
  }
};

module.exports = {
  GetMainPosting,
  CreatePosting,
};