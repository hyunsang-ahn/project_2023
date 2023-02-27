


  const passport = require('passport');

  const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/'
  }), (req, res) => {
    res.redirect('/');
  });
  
  router.get('/', (req, res) => {
  
      console.log('salfj;asldjf;lasd')
      res.send('Hello World expr123123123ess!')
    })
  
module.exports = router; // 모듈로 만드는 부분