const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models').User;
const configAuth = require('./auth.js');


module.exports = function(passport) {
  // Serialize and Deserialize
  passport.serializeUser(function(user,done) {
    done(null,user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user) {
      done(err, user);
    });
  });

  
};