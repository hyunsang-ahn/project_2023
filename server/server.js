


const express = require('express')
const http = require('http');

const app = express()
const db = require('./db.js'); // db 불러오기
db(); // 실행
const session = require('express-session'); // 세션 설정
const passport = require('passport');

const route = require('./route.js');
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user.js');
app.use(bodyParser.json())
app.set('port', process.env.PORT || 30022);

// app.use(session({
//   secret: 'sdfsdf',
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({ mongoUrl: 'mongodb://localhost/test-app' })

// }));
app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화

app.use(passport.authenticate('session'));

app.use(passport.initialize()); // passport 구동






passport.use( new LocalStrategy({
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

passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
  console.log('serializeUser========================',user)
  done(null, user); // 여기의 user._id가 req.session.passport.user에 저장
});
passport.deserializeUser((user, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
  console.log('deserializeUser========================',user)

  // User.findById(id, (err, user) => {
  //   done(null, user); // 여기의 user가 req.user가 됨
  // });
  done(null, user); // 여기의 user가 req.user가 됨

});










//서버 생성
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


app.use('/api', route);


// app.get('/login', (req, res) => {
//   res.send('Hello 안현상 api 포트포워딩 및 프록시 패스 성공~!')
// })

