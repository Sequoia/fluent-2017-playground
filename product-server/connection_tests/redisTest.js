require('dotenv').config();
const redis_url = process.env.REDIS_SESSION_URL;
/// ^^CONFIG^^ ///

const redis = require('redis');

const r = redis.createClient({
  url : redis_url
});

process.pid;

r.set('pid1', `${process.pid}`, console.log);
r.get('pid1', function(output, value){
  console.log(`response output: ${output}`);
  console.log(`response value ${value}`);
  if(parseInt(value) === process.pid){
    console.log('REDIS CONNECTION WORKING!');
  }else {
    console.error('Redis not working :(');
  }
});

// console.log(redis);