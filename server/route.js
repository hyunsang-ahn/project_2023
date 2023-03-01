


const passport = require('passport');
const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


router.post('/login', (req, res, next) => {
  console.log('라우터 시작 ');
  console.log('req.body=====================',req.body)
  console.log('req.query=====================',req.query)

  // POST /api/user/login
  passport.authenticate('local', (err, user, info) => {
    console.log('passport.authenticalte callback ');
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, loginErr => { // 이 부분 callback 실행
      console.log('req.login callback');
      if (loginErr) {
        return next(loginErr);
      }
      const fillteredUser = { ...user.dataValues };
      delete fillteredUser.password;
      return res.json(fillteredUser);
    });
  })(req, res, next);
});

router.get('/', (req, res) => {

  console.log('salfj;asldjf;lasd')
  res.send('Hello World expr123123123ess!')
})

module.exports = router; // 모듈로 만드는 부분