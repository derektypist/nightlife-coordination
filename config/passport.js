const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models').User;

module.exports = function(passport) {
  // Serialize and Deserialize
  passport.serializeUser(function(user,done) {
    done(null,user.id);
  });
};