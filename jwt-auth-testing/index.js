// https://github.com/auth0/node-jsonwebtoken
// [ ] Sign a claim
// [ ] Verify
// [ ] Set expiry
// [ ] Verify expires

const SECRET = 'abc, it\'s easy as 123';
const jwt = require('jsonwebtoken');

const token1 = jwt.sign({ foo: 'bar' }, SECRET);
const static1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0OTU0ODY2Mjl9.n6pcamBL99hLKQFlD20FjqwpmDClozI8JAarxcJtugU';

print('token1', jwt.verify(token1, SECRET));
print('static1', jwt.verify(static1, SECRET));

const token2 = jwt.sign(
  { foo: 'bar', userid: 123 },
  SECRET,
  { expiresIn : "1000"}
);
const static2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJ1c2VyaWQiOjEyMywiaWF0IjoxNDk1NDg2OTM5LCJleHAiOjE0OTU0ODY5NDB9.3kTmixR_T6O5WLOsmmGjaiZK8ScuiMFtVCBhmWsa0aA';

console.log('token2: ' + token2);

jwt.verify(static2, SECRET, (err, decoded) => {
  if(err) throw err;
  print('static2', decoded);
})

function print(label, token){
  console.log(`${label}: ${JSON.stringify(token)}`)
}

// process.exit();