// 회원 가입 종합 확인
CheckRegister = (userID, nickname, PW, confirmPW) => {
  if (!CheckID(userID)) {
    return { result: 'fail', msg: '아이디가 형식에 맞지 않습니다.' };
  } else if (!CheckNickname(nickname)) {
    return { result: 'fail', msg: '닉네임이 형식에 맞지 않습니다.' };
  } else if (!CheckPWLength(PW)) {
    return { result: 'fail', msg: '비밀번호의 길이가 짧습니다.' };
  } else if (!CheckIncludePW(userID, PW)) {
    return { result: 'fail', msg: '아이디에 비밀번호가 포함되어있습니다.' };
  } else if (!ComparePWandConfirm(PW, confirmPW)) {
    return { result: 'fail', msg: '재확인 비밀번호가 다릅니다.' };
  }
  return false;
};

// 아이디 구성이 영어 대소문자, 숫자, 길이를 확인하는 기능
CheckID = (userID) => {
  const filter = /^[a-z0-9+]*$/;
  if (userID.length >= 3 && filter.test(userID)) {
    return true;
  }
  return false;
};

CheckNickname = (nickname) => {
  const filter = /^[a-z0-9+]*$/;
  if (nickname.length >= 3 && filter.test(nickname)) {
    return true;
  }
  return false;
};

// 패스워드의 길이를 확인하는 기능
CheckPWLength = (PW) => {
  if (PW.length >= 4) {
    return true;
  }
  return false;
};

// 아이디에 패스워드 포함 유무를 확인하는 기능
CheckIncludePW = (userID, PW) => {
  if (!userID.includes(PW)) {
    return true;
  }
  return false;
};

// 비밀번화와 재확인 비밀번호가 일치하는 지를 확인하는 기능
ComparePWandConfirm = (PW, confirmPW) => {
  if (PW === confirmPW) {
    return true;
  }
  return false;
};

module.exports = {
  CheckRegister,
  CheckNickname,
  CheckID,
  CheckPWLength,
  CheckIncludePW,
  ComparePWandConfirm,
};
