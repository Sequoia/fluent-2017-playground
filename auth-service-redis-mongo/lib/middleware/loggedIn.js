module.exports = function loggedIn(req, res, next){
  if(!req.user){
    console.log('not logged in!!');
    return res.redirect('/auth');
  }
  else{
    next();
  }
};