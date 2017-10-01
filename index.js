const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'Hello Reach';
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
