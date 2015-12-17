var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  basic: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
});

userSchema.plugin(uniqueValidator)

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
