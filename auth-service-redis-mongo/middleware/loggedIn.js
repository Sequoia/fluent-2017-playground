module.exports = function loggedIn(req, res, next){
  if(!req.user){
    //not logged in!
    return res.redirect('/');
  }
  else{
    next();
  }
};