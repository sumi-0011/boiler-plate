const { User } = require("../models/User");
let auth = (req, res, next) => {
  //인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다. cookie-parser 필요
  let token = req.cookies.x_auths; //쿠키 이름이 "x_auths"

  // 토큰을 복호화 한후, 유저를 찾는다.
  //User Model이 필요, User model에 토큰으로 유저를 찾는 메소드
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //토큰과 user을 req에 넣어줌으로 있어서 index.js에서 req.user로 받을수 있다.
    req.token = token;
    req.user = user;
    next(); //next가 없으면 미들웨어에 갖힘
  });
  // 유저가 있으면 인증 okay
  //유저가 없으면 인증  No
};
