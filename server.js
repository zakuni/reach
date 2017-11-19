require('babel-register')({
  'presets': [['env', {
    'targets': {
      'node': 'current'
    }
  }]]
});
const logger = require('koa-logger');
const views = require('koa-views');
const router = require('koa-router')();
const path = require('path');

const Koa = require('koa');
const app = new Koa();

app.use(logger());

const cors = require('@koa/cors');
app.use(cors());

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const session = require('koa-session');
app.keys = [process.env.SESSION_SECRET];
app.use(session(app));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.use(views(path.resolve(__dirname, 'views'), {
  extension: 'pug'
}));
app.use(require('koa-static')(path.resolve(__dirname, 'dist')));

require('./auth');
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

const IndexRouter = require('./routes').default;

router.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/index',
    failureRedirect: '/'
  })
);

router.get('/logout', async ctx => {
  await ctx.logout();
  ctx.redirect('/');
});

app
  .use(IndexRouter.routes())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);
