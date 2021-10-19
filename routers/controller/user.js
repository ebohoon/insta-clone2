const Users = require('../../schema/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
//library 폴더에 회원가입 폼과 공통된 에러메세지 출력을 위한 임포트
const { CheckRegister } = require('../../library/signup');
const printError = require('../../library/error');

//회원가입 등록  확인완료
SignupUser = async (req, res, next) => {
  try {
    const UserSchema = Joi.object({
      userId: Joi.string()
        .min(3)
        .pattern(/^[a-z0-9]{3,10}/)
        .required(),
      nickname: Joi.string()
        .min(3)
        .pattern(/^[a-z0-9]{3,10}/)
        .required(),
      password: Joi.string()
        .min(4)
        .pattern(new RegExp('^[a-z0-9]{4,10}$'))
        .required(),
      confirmPassword: Joi.ref('password'),
    });

    const { userId, nickname, password, confirmPassword } =
      await UserSchema.validateAsync(req.body);
    const CheckBody = await CheckRegister(
      userId,
      nickname,
      password,
      confirmPassword
    );

    if (await Users.findOne({ userId })) {
      res.send({ result: 'fail', msg: '이미 존재하는 아이디입니다' });
    } else if (await Users.findOne({ nickname })) {
      res.send({ result: 'fail', msg: '이미 존재하는 닉네임입니다' });
    } else if (CheckBody) {
      res.send(CheckBody);
    } else {
      const Encryptpassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT)
      );
      await Users.create({ nickname, userId, password: Encryptpassword });
      res.status(200).send({ result: 'success', msg: '회원가입 성공' });
    }
  } catch (err) {
    printError(req, err);
    next(err);
  }
};

//ID 중복확인 체크
CheckDuplicatedID = async (req, res, next) => {
  try {
    const IdSchema = Joi.object({
      userId: Joi.string()
        .min(3)
        .pattern(/^[a-z0-9]{3,10}/)
        .required(),
    });
    const { userId } = await IdSchema.validateAsync(req.body);
    const existUsers = await Users.findOne({ userId });
    if (existUsers) {
      res.send({ result: 'fail', msg: '이미 존재하는 아이디입니다.' });
    } else {
      res.send({ result: 'success', msg: '사용 가능한 아이디입니다' });
    }
  } catch (err) {
    res.send({ result: 'fail', msg: '형식에 맞지 않는 아이디입니다.' });
    printError(req, err);
    next();
  }
};

//Nickname 중복확인 체크  //조이관련 정규식 표현 다듬기
CheckDuplicatedNickname = async (req, res, next) => {
  try {
    const NicknameSchema = Joi.object({
      nickname: Joi.string()
        .min(3)
        .pattern(/^[a-z0-9]{3,10}/) //여기는 수정해야함 아직 계속 오류남
        .required(),
    });
    const { nickname } = await NicknameSchema.validateAsync(req.body);
    const existNickname = await Users.findOne({ nickname });
    if (existNickname) {
      res.send({ result: 'fail', msg: '이미 존재하는 닉네임입니다.' });
    } else {
      res.send({ result: 'success', msg: '사용 가능한 닉네임입니다' });
    }
  } catch (err) {
    res.send({ result: 'fail', msg: '형식에 맞지 않는 닉네임입니다.' });
    printError(req, err);
    next();
  }
};

//로그인 페이지 허용, 로그인한 유저는 튕겨져 나감
GetLoginPage = (req, res, next) => {
  try {
    if (res.locals.user) {
      // console.log(res.locals.user);
      res.send({ result: 'success', msg: 'success' });
    }
  } catch (err) {
    res.send({ result: 'fail', msg: 'fail' });
    printError(req, err);
    next();
  }
  // res.send('로그인후 메인 페이지');
};

//로그인 시도
TryLogin = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const user = await Users.findOne({ userId });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        //로그인 성공시 토큰 생성
        const token = jwt.sign(
          { userId: user.userId, nickname: user.nickname },
          process.env.SECRET_KEY,
          { expiresIn: '5d' }
        );
        console.log(`발급된 토큰: ${token}\n 로그인 성공`);
        res.send({ result: 'success', info: user, token: token });
      } else {
        res.send({ result: 'fail', msg: '아이디 또는 비밀번호가 틀렸습니다.' });
      }
    } else {
      res.send({ result: 'fail', msg: '존재하지 않는 아이디입니다.' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

module.exports = {
  SignupUser,
  CheckDuplicatedID,
  CheckDuplicatedNickname,
  GetLoginPage,
  TryLogin,
};
