const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

// User Schema
const UserSchema = new Schema({
  local: {
    username: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});