const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
          trim: true,
          minlength: 3,
          maxlength: 50
     },
     email: {
          type: String,
          required: true,
          trim: true,
          validate: {
               validator: validator.isEmail,
               message: 'Invalid email format'
          },
          required: [true, 'Email is required'],
          unique: true,
     },
     password: {
          type: String,
          required: true,
          maxlength: [100, 'Password must be at most 100 characters long']
     },
     role: {
          type: String,
          enum: ['user', 'admin'],
          default: 'user'
     },
     resetCode:String,
     resetExpires:Date,


})

const User = mongoose.model('User', UserSchema);
module.exports = User;