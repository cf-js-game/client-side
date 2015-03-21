'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  basic: {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  },
  username: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(appSecret, callback) {
  eat.encode({id: this._id, timestamp: new Date()}, appSecret, callback);
};

module.exports = mongoose.model('User', userSchema);
