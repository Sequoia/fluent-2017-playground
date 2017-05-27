//requiring this file will cause mongodb to connect
require('./mongo_connect');
const bcrypt = require('bcrypt');
// In a secure setup we'd require a salt here too and pass it to bcrypt :)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: {
    type: String,
    set: function(password){
      return bcrypt.hashSync(password, 2);
    }
  }
});

UserSchema.methods.checkPassword = function(password){
  console.log(`checking ${password}`);
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model(
  'User',
  UserSchema
);

// set up a mongoose model and pass it using module.exports
module.exports = User;