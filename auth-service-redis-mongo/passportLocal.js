const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./User');

const users = {};

const mongooseStrategy = new LocalStrategy(checkMongoLogin);
passport.use('local', mongooseStrategy);

passport.serializeUser(function serializeJustId(user, done) {
  users[user.id] = user.toJSON();
  done(null, user.id);
});

passport.deserializeUser(function desrializeById(id, done) {
  done(null, users[id]);
});

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {function} done
 */
function checkMongoLogin(username, password, done) {
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
}

module.exports = passport;
