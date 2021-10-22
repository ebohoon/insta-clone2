const Users = require('../../schema/users');
const Postings = require('../../schema/postings');
const printError = require('../../library/error');
const Comments = require('../../schema/comments');
const Likes = require('../../schema/comments');

//메인포스팅 불러오기
GetMainPosting = async (req, res, next) => {
  try {
    const getPostings = await Postings.find().sort('-createdAt');
    console.log(getPostings);
    res.json(getPostings);
  } catch (err) {
    console.log('캐치 에러');
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
    await Postings.create({ nickname, text, createdAt, image });
    res.send({ result: 'success', msg: '게시글 작성에 성공했습니다.' });
  } catch (err) {
    res.send({ result: 'fail', msg: '게시글 작성에 실패했습니다.' });
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
    console.log('캐치 에러');
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
    res.send({ result: 'success', comment });
  } catch (err) {
    res.send({ result: 'fail' });
    printError(req, err);
    next();
  }
};

//댓글 불러오기
GetComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comments.find({ postId: postId }).sort('-createdAt');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.log('캐치 에러');
    printError(req, err);
    next();
  }
};

//좋아유
ClickedLike = async (req, res, next) => {
  //카운트, 초기값설정, 갱신(누르면),
  const { postId } = req.params; //좋아요를 누르고 싶은 게시물 postId 가져오기
  const nickname = res.locals.user.nickname; // 현재 사용자가 눌럿는지 판단하기 위한 닉네임
  //로그인한 사람이 좋아요를 눌렀는지 확인하기
  const CheckLike = await Likes.findOne({ postId: postId, nickname: nickname });

  //처음 checkLike의 Default값은 false, 체크를 안했다면 true 바꾸고 다시 바꾼다면 false
  // ture 되면 카운트 +1 , false 되면 카운트 -1
  if (!CheckLike.checkLike) {
    const likes = await Likes.findOneAndUpdate(
      { postId: postId, nickname: nickname },
      { $set: { checkLike: true, countNum: countNum + 1 } }
    );
  } else {
    const likes = await Likes.findOneAndUpdate(
      { postId: postId, nickname: nickname },
      { $set: { checkLike: false, countNum: countNum - 1 } }
    );
  }
  // 좋아요의 총개수 파악하기
  const getLike = await Likes.findOne({ postId: postId });
  const sumlike = getLike.countNum;
  res.json(likes, sumlike);
};

module.exports = {
  GetMainPosting,
  CreatePosting,
  CreateComment,
  GetDetailPosting,
  GetComment,
  ClickedLike,
};
