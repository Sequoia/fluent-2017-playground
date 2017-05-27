const User = require('../User');

// cleanup
User.remove({username: 'foo'})
// create demo user
.then(()=>{
  return User.create({
    username : 'foo',
    password : 'bar'
  })  
})
// lookup user
.then(()=>{
  return User.findOne({username: 'foo'})
})
// log
.then(user => {
  console.log(user);
  return user;
})
// check password
.then(user => {
  if(user.checkPassword('bar')){
    console.log(`password GOOD`);
  }else{
    console.log('password BAD');
  }
})
.catch(e => console.error(e));