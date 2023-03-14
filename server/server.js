const Koa = require('koa');
const app = new Koa();

const router = require('./router');

app.use(router.routes());
//app.use(mount("/", router.routes()));

app.listen('4000', () => {
  console.log('app.start')
});