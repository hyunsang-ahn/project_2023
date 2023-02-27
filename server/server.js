

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
const session = require('express-session'); // 세션 설정
const passport = require('passport'); // 여기와
const passportConfig = require('./passport'); // 여기
const route = require('./route.js');

app.set('port', process.env.PORT || 30022);
app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
//서버 생성
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
db(); // 실행

app.use('/api', route);


app.get('/login', (req, res) => {
  res.send('Hello 안현상 api 포트포워딩 및 프록시 패스 성공~!')
})

