


const passport = require('passport');
const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
  function (req, res) {
    //홈으로 이동함.
    res.redirect('/');
  });
router.get('/fail', (req, res) => {

  console.log('fail')
  res.send('Hello World expr123123123ess!')
})

router.get('/loginChk', (req, res) => {

  console.log('login/chk')
  res.send(req.user)
})


module.exports = router; // 모듈로 만드는 부분