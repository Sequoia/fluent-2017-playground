require('dotenv').config();
const url = process.env.MONGO_USER_URL;

/// ^CONFIG^ ///

const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});