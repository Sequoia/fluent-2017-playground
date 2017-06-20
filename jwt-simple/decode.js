const jwt = require('jsonwebtoken');
const SECRET = "As You Like It";

const token = process.argv[2];
  
const payload = jwt.verify(token, SECRET);

console.log(payload);
