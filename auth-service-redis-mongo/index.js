require('dotenv').config();
const port = process.env.PORT || 8080;

// ^^ CONFIG ^^ //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./passportLocal');

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized : false,  // create session for non-logged-in users
  resave : false              // save back to session store for each request
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get('/', function sendLoginForm(req, res){
  res.sendFile('./public/login.html', {
    root: __dirname
  });
})

app.get('/account', function accountJSON(req, res){
  console.log(req.user);
  res.json(req.user);
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/login.html'
}));

app.get('/logout', (req, res) => {
  req.logout(); // exposed by passport, destroys login session
  res.redirect('/');
});
// end routes

app.listen(port, (err) => {
  if(err) throw err;
  console.log(`listening on port ${port}`);
  console.log(`(probably http://localhost:${port} )`);
})