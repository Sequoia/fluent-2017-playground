'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 8090;
if(!process.env.PORT){
  console.log('using default port');
}

// App
const app = express();
app.get('/', function (req, res) {
  return res.json({
    argv : process.argv,
    env  : process.env
  });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);