const Users = require("../../schema/users");
const Postings = require("../../schema/postings");
const printError = require("../../library/error");
const Comments = require("../../schema/comments");
const Likes = require("../../schema/comments");

//메인포스팅 불러오기
GetMainPosting = async (req, res, next) => {
  try {
    // const getPostings = await Postings.find().sort("-createdAt");
    // console.log(getPostings);
    const getPostings = await Postings.find()
      .sort("-createdAt")
      .populate("Likes")
      .exec((err, data) => {
        console.log(data);
      });
    console.log(getPostings);
    res.json(getPostings);
  } catch (err) {
    console.log("캐치 에러");
    printError(req, err);
    next();
  }
};

CreatePosting = async (req, res, next) => {
  try {
    const userId = res.locals.user.userId; //유저정보가져오기위한 수단 날짜생성
    const Finduser = await Users.findOne({ userId: userId });
    const nickname = Finduser.nickname; //작성자 닉네임 가져오기
    const { text, createdAt } = req.body;
    const image = `http://3.34.139.137/${res.locals.fileName}`;
    await Postings.create({ nickname, text, createdAt, image, Like });
    // await Likes.Create({
    //   postId: postId,
    //   nickname: nickname,
    // });
    res.send({ result: "success", msg: "게시글 작성에 성공했습니다." });
  } catch (err) {
    res.send({ result: "fail", msg: "게시글 작성에 실패했습니다." });
    printError(req, err);
    next();
  }
};

// 상세 게시물 불러오기
GetDetailPosting = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const getDetail = await Postings.findOne({ postId: postId });
    //findbyId로 구현해보기
    console.log(getDetail);
    res.json(getDetail);
  } catch (err) {
    console.log("캐치 에러");
    printError(req, err);
    next();
  }
};

//댓글 등록
CreateComment = async (req, res, next) => {
  try {
    const nickname = res.locals.user.nickname;
    const { postId } = req.params;
    const { text, createdAt } = req.body;
    const comment = await comments.create({
      nickname,
      postId,
      text,
      createdAt,
    });
    // console.log(comment)
    res.send({ result: "success", comment });
  } catch (err) {
    res.send({ result: "fail" });
    printError(req, err);
    next();
  }
};

//댓글 불러오기
GetComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comments.find({ postId: postId }).sort("-createdAt");
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.log("캐치 에러");
    printError(req, err);
    next();
  }
};

CreateLike = async (req, res, next) => {
  const { postId } = req.params;
  const nickname = res.locals.user.nickname;
  const { currentLike } = req.body;
  //닉네임 존재여부 판단 후 좋아요 스키마 생성하기
  if (currentLike === true) {
    const likes = await Likes.Create({
      nickname,
      postId,
      countNum: countNum + 1,
      createdAt,
      checkLike: currentLike,
    });
  } else {
    const likes = await Likes.Create({
      nickname,
      postId,
      countNum: countNum + 1,
      createdAt,
      checkLike: currentLike,
    });
  }
};

//좋아요 업데이트
ClickedLike = async (req, res, next) => {
  try {
    //카운트, 초기값설정, 갱신(누르면),
    const { postId } = req.params; //좋아요를 누르고 싶은 게시물 postId 가져오기
    const nickname = res.locals.user.nickname; // 현재 사용자가 눌럿는지 판단하기 위한 닉네임
    //로그인한 사람이 좋아요를 눌렀는지 확인하기

    const { eventLike } = req.body;
    const existLike = await Likes.findOne({ postId, nickname });
    // 1번 => 처음 라이크 생성시 트루로 생성 (꽉찬 하트)
    // 업데이트 발생 시 enventLike 값이 true false 두가지 경우
    //true면 카운트 넘버가 변하면 안됨.
    //false라면 카운트 넘버가 -1 되야 함
    // 2번 => 처음 라이크 생성 시 false 생성(빈하트)
    // eventLike 값이 true 라면 카운트 넘버가 +1
    // eventLike 값이 false라면 카운트 변하면 안됨

    if (existLike) {
      if (eventLike === false) {
        const likes = await Likes.findOneAndUpdate(
          { postId: postId, nickname: nickname },
          { $set: { checkLike: eventLike, countNum: countNum - 1 } }
        );
      } else {
        const likes = await Likes.findOneAndUpdate(
          { postId: postId, nickname: nickname },
          { $set: { checkLike: eventLike, countNum: countNum + 1 } }
        );
      }
    }

    // 좋아요의 총개수 파악하기
    const getLike = await Likes.findOne({ postId: postId });
    const sumlike = getLike.countNum;
    res.json(likes, sumlike);
  } catch (err) {
    res.send({ result: "fail" });
    printError(req, err);
    next();
  }
};

module.exports = {
  GetMainPosting,
  CreatePosting,
  CreateComment,
  GetDetailPosting,
  GetComment,
  ClickedLike,
};
