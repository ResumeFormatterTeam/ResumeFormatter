var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: String,
  basic: {
    username: String,
    password: String
  }
});

userSchema.methods.hashPW = function(password) {
  var hash = this.basic.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.checkPW = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(callback) {
  var id = this._id;
  eat.encode({id: id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);
