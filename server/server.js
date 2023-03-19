const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const session = require('express-session'); // 세션 설정


const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
const passport = require('passport'); // 여기와

const path = require('path');

const passportConfig = require('./passport.js')
const flash = require('connect-flash')

const bodyParser = require('body-parser')
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
console.log(`ready`)
// app.use(
//   createProxyMiddleware('/api', {
//     target: 'http://localhost:5000/',
//     changeOrigin: true
//   })
// )

// app.use("/", createProxyMiddleware("/", { target: `http://localhost:30023` }));
