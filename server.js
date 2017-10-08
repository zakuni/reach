const views = require('koa-views');
const router = require('koa-router')();
const path = require('path');

const Koa = require('koa');
const app = new Koa();

const PORT = process.env.PORT || 3000;

app.use(views(path.resolve(__dirname, 'dist')));
app.use(require('koa-static')(path.resolve(__dirname, 'dist')));

router.get('/', async function (ctx, next) {
  await ctx.render('index');
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);
