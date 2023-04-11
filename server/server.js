const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const session = require('express-session'); // 세션 설정

require("dotenv").config();


const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
const passport = require('passport'); // 여기와

const path = require('path');

const passportConfig = require('./passport.js')
const flash = require('connect-flash')

const bodyParser = require('body-parser')
// 프로젝트 root 디렉토리 경로를 구합니다.
const rootDirectory = path.dirname(require.main.filename);
console.log('rootDirectory=================', rootDirectory.replace('\server', ''))

// uploads 폴더의 경로를 구합니다.
const uploadDirectory = path.join(rootDirectory, 'uploads');
console.log('uploadDirectory=================', uploadDirectory)
// /uploads 경로로 접근 가능하도록 설정합니다.
app.use('/uploads', express.static(uploadDirectory));




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();



app.listen(port, () => { console.log(`Listening on port ${port}`) });

// Router Use

app.use('/custom-api', require(path.join(__dirname, 'routes/index.js')))

// const { db_users } = require('./models/users')

// app.use(
//   createProxyMiddleware('/api', {
//     target: 'http://localhost:5000/',
//     changeOrigin: true
//   })
// )

// app.use("/", createProxyMiddleware("/", { target: `http://localhost:30023` }));
