const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./user');

module.exports = () => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user._id가 req.session.passport.user에 저장
  });
  passport.deserializeUser((user, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
    // User.findById(id, (err, user) => {
    //   done(null, user); // 여기의 user가 req.user가 됨
    // });
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, userId, password, done) => {
    console.log('passport의 local-login : ', userId, password)

    if (userId != 'test' || password != '12345') {
      console.log('비밀번호 불일치!')
      return done(null, false, req.flash('loginMessage', '비밀번호 불일치!'))
    }

    console.log('비밀번호 일치!')
    return done(null, {
      userId: userId,
      password: password
    })
  }))
};