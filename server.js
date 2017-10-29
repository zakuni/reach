const logger = require('koa-logger');
const views = require('koa-views');
const router = require('koa-router')();
const path = require('path');

const Koa = require('koa');
const app = new Koa();
const User = require('./models/user');

app.use(logger());

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

const passport = require('koa-passport');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

// eslint-disable-next-line no-unused-vars
router.get('/', async function (ctx, next) {
  await ctx.render('index');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
);

router.get('/logout', async ctx => {
  await ctx.logout();
  ctx.redirect('/');
});

// eslint-disable-next-line no-unused-vars
router.get('/app', function(ctx, next) {
  ctx.body = 'login successful';
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);
