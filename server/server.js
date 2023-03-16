const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');


const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, () => { console.log(`Listening on port ${port}`) });


// app.use(
//   createProxyMiddleware('/api', {
//     target: 'http://localhost:5000/',
//     changeOrigin: true
//   })
// )

app.use("/custom-api", require("./routes"));
// app.use("/", createProxyMiddleware("/", { target: `http://localhost:30023` }));
