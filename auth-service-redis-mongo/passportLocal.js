require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./User');

// REDIS serialization

const redis = require('redis');
const client = redis.createClient({
  url : process.env.REDIS_SESSION_URL
});

// END REDIS serialization

//// IN MEMORY serialization
const users = {};

function serializeJustId(user, done) {
  users[user.id] = user.toJSON();
  done(null, user.id);
}

function deserializeById(id, done) {
  if(users[id]){
    done(null, users[id]);
  }else{
    done(null, false);
  }
}
/// END IN MEMORY serialization

passport.serializeUser(function serializeToRedis(user, done){
  client.set(user.id, JSON.stringify(user), function setComplete(err, response){
    if(err) return done(err);
    else done(null, user.id)
  });
});

passport.deserializeUser(function deserializeFromRedis(id, done){
  client.get(id, function getComplete(err, value){
    try{
      if(value){
        return done(null, JSON.parse(value)); //user session found
      }else{
        return done(null, false); // no user
      }
    }catch(e){
      done(e);
    }
  });
});

const mongooseStrategy = new LocalStrategy(checkMongoLogin);
passport.use('local', mongooseStrategy);

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
