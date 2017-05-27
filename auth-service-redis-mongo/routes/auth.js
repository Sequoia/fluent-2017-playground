const router = module.exports = new require('express').Router();
const loggedIn = require('../lib/middleware/loggedIn');
const loginRoute = require('../lib/passportLogin');

//for user checking/cookie writing
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));

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

router.post('/login', loginRoute);

router.get('/logout', (req, res) => {
  req.logout(); // exposed by passport, destroys LOGIN session (not whole session)
  req.session.destroy();
  res.redirect('/');
});