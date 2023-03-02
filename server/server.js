

// const express = require('express');
// const path = require('path');
// const app = express();
// const db = require('./db.js'); // db 불러오기
// const route = require('./route.js');


// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'html'));
// db(); // 실행
// app.use(express.static(path.join(__dirname, 'html')));
// app.use('/', route);
// // 에러 처리 부분
// app.listen(8080, () => {
//   console.log('Express App on port 8080!');
// });

//필요한 모듈 선언





// //라우팅 모듈 선언
// var indexRouter = require('./routes/index');

// //request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
// app.use('/', indexRouter);


const express = require('express')
const http = require('http');

const app = express()
const db = require('./db.js'); // db 불러오기
db(); // 실행
const session = require('express-session'); // 세션 설정
const passport = require('passport');

const route = require('./route.js');
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')('session');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json())
app.set('port', process.env.PORT || 30022);
// MongoStore는 세션 데이터를 저장하기 위해 사용된다.
// 이전에 mongoose.createConnection의 결과를 담아뒀던 connection 상수를 이용
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' })

// https://www.npmjs.com/package/express-session 에서 옵션 확인 가능
// secret: 세션을 인증하기 위해 사용하는 랜덤한 문자열, 실무에서는 엄청 긴 랜덤생성 문자열을 씀
// resave: 이걸 true로 설정하면, 세션이 아무것도 바뀌지 않더라도 저장함. 이걸 세팅안해도 앱은 돌지만, 터미널에서 경고 메세지가 송출됨
// saveUnintialized: resave와 비슷함. true로 세팅될 경우, 세션이 초기화되지 않은 경우에도 세션이 강제로 저장됨.
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));


app.use(passport.authenticate('session'));

app.use(passport.initialize()); // passport 구동




passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
  done(null, user._id); // 여기의 user._id가 req.session.passport.user에 저장
});
passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
  User.findById(id, (err, user) => {
    done(null, user); // 여기의 user가 req.user가 됨
  });
});

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












//서버 생성
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


app.use('/api', route);


// app.get('/login', (req, res) => {
//   res.send('Hello 안현상 api 포트포워딩 및 프록시 패스 성공~!')
// })

