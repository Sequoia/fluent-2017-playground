require('dotenv').config();
const port = process.env.PORT || 8080;

// ^^ CONFIG ^^ //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const passport = require('./passportLocal');

const app = express();
const authRouter = require('./routes/auth');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
// app.use(session({
//   secret: 'keyboard cat',
//   saveUninitialized : false,  // create session for non-logged-in users
//   resave : false              // save back to session store for each request
// }));
app.use(session({
  store: new RedisStore({ url: process.env.REDIS_SESSION_URL }),
  secret: 'keyboard cat',
  saveUninitialized : false,  // create session for non-logged-in users
  resave : false              // save back to session store for each request
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.get('/', (req, res) => res.redirect('/auth'));

app.listen(port, (err) => {
  if(err) throw err;
  console.log(`listening on port ${port}`);
  console.log(`(probably http://localhost:${port} )`);
})