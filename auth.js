const passport = require('koa-passport');
const User = require('./models/user');

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
async function(accessToken, refreshToken, profile, done) {
  let user = await User.findOne({ googleId: profile.id }).catch(err => {
    return done(err);
  });
  if (!user) {
    user = await User.create({
      googleId: profile.id, username: profile.displayName, profile_image_url: profile.photos[0].value
    }).catch(err => {
      return done(err);
    });
  } else {
    user.username = profile.displayName;
    user.profile_image_url = profile.photos[0].value;
    user = await user.save().catch(err => {
      return done(err);
    });
  }
  return done(null, user);
}));
