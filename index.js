const views = require('koa-views');
const router = require('koa-router')();

const Koa = require('koa');
const app = new Koa();

app.use(views(__dirname));

router.get('/', async function (ctx, next) {
  await ctx.render('index');
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
