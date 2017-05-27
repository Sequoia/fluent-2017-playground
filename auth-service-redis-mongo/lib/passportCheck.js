require('dotenv').config();

const passport = require('passport');

//for cookie checking (and/or setting)
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');

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


/**
 * Uses passport to CHECK redis for sessions
 * sets `.user` on request objects
 * @param {Express.Application} app 
 */
function check(app){
  app.use(cookieParser());
  app.use(session({
    store: new RedisStore({ url: process.env.REDIS_SESSION_URL }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized : false,  // create session for non-logged-in users
    resave : false              // save back to session store for each request
  }));
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = check;