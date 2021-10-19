<<<<<<< HEAD
const Postings = require('../schema/postings.js');

postPostings = async (req, res) => {


    const {text} = req.body;
    const {
        nickname,
        image
    } = res.locals.user;


    try {
        

        // 사용자 조회 - nick을 가져오기 위해 필요
        // const user = await User.findById(userId);
        const posting = {


            nickname: nickname,
            image,
            text,
            createdAt,
        };

        await Postings.create(posting);
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: "게시물 생성 실패하였습니다."
        });
    }
};
=======
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
    console.log('트라이들어옴');
    // Joi 검증 필요한지 확인하자??
    //ID로 찾아서 nickname을 가져올 지 아니면
    const userId = res.locals.user; //유저정보가져오기위한 수단 날짜생성
    console.log(userId);
    const Finduser = await Users.findOne({ userId: userId });
    console.log(Finduser.nickname); //작성자 닉네임 가져오기

    const { text, image, createdAt } = req.body;
    await Postings.create({ nickname, text, image, comment, like });
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
>>>>>>> 2daf4c5eb694f787275b07a55639c622fa8f8dad
