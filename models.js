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

const User = mongoose.model('user', UserSchema);

// Apply hashing password
let saltRounds = 10;
let salt = bcrypt.genSaltSync(saltRounds);
UserSchema.methods.genHash = function(password) {
  return bcrypt.hashSync(password, salt);
};

// Compare input password with database password
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Place Schema
const PlaceSchema = new Schema({
  name: String,
  zip_code: String,
  reservedList: [String],
  numgoing: {
    type: Number,
    default: 0
  }
});

const Place = mongoose.model('place',PlaceSchema);

// Export Modules
module.exports.User = User;
module.exports.Place = Place;