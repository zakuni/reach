const Router = require('koa-router');
const router = new Router();

// eslint-disable-next-line no-unused-vars
router.get('/', async function (ctx, next) {
  await ctx.render('index');
});

export default router;
