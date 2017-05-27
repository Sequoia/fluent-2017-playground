require('dotenv').config();

const passport = require('passport');

// REDIS serialization

const redis = require('redis');
const client = redis.createClient({
  url : process.env.REDIS_SESSION_URL
});

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

// END REDIS serialization

module.exports = passport;
