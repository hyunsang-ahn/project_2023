const Router = require('koa-router');


let router = new Router();

router.get('/version', ctx => ctx.body = {
    status: 'ok'
})

module.exports = router;