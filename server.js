const logger = require('koa-logger');
const views = require('koa-views');
const router = require('koa-router')();
const path = require('path');

const Koa = require('koa');
const app = new Koa();

app.use(logger());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('koa-webpack-middleware').devMiddleware;
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
}

app.use(views(path.resolve(__dirname, 'dist')));
app.use(require('koa-static')(path.resolve(__dirname, 'dist')));

router.get('/', async function (ctx, next) {
  await ctx.render('index');
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);
