const router = module.exports = new require('express').Router();
const loggedIn = require('../middleware/loggedIn');
const passport = require('../passportLocal');

// routes
router.get('/', function sendLoginForm(req, res){
  res.json({
    html: '<h1>Products page!</h1>',
    user: req.user,
    session: req.session,
  });
});

router.get('/secure', loggedIn, function accountJSON(req, res){
  res.json({
    user: req.user,
    session: req.session
  });
});