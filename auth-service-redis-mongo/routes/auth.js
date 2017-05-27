const router = module.exports = new require('express').Router();
const loggedIn = require('../middleware/loggedIn');
const passport = require('../passportLocal');

// routes
router.get('/', function sendLoginForm(req, res){
  res.redirect('/login.html');
});

router.get('/account', loggedIn, function accountJSON(req, res){
  res.json(req.user);
});

router.get('/add_one', function addOne(req, res){
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.json({
    count: req.session.count
  });
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/account',
  failureRedirect: '/login.html'
}));

router.get('/logout', (req, res) => {
  req.logout(); // exposed by passport, destroys login session
  req.session.destroy();
  res.redirect('/');
});