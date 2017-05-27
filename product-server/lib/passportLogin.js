require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./User');

passport.use('local', new LocalStrategy(function checkMongoLogin(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.checkPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));

/**
 * Attach this to a router to do login
 */
const loginRoute = passport.authenticate('local', {
  successRedirect: '/auth/account',
  failureRedirect: '/login.html'
});

module.exports = loginRoute;