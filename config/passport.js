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

  // Signup Local Strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req,email,password,done) {
    process.nextTick(function() {
      User.findOne({"local.username": email}, function(err,user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, req.flash('signupMessage','That email has already been taken'));
        } else {
          let theNewUser = new User();
          theNewUser.local.username = email;
          theNewUser.local.password = theNewUser.genHash(password);
          theNewUser.save(function(err) {
            if (err) {
              throw (err);
            }
            return done(null, theNewUser);
          });
        }
      });
    });
  }));

  // Login Local Strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req,email,password,done) {
    process.nextTick(function() {
      User.findOne({"local.username": email}, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No User Found'));
        }

        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Wrong Password'));
        }

        return done(null,user);
      });
    });
  }));

  // Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          // If user is not Found
          let theNewUser = new User();
          theNewUser.facebook.id = profile.id;
          theNewUser.facebook.token = accessToken;
          theNewUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          theNewUser.facebook.email = profile.emails[0].value;

          theNewUser.save(function(err) {
            if (err) {
              throw (err);
            }
            return done(null, theNewUser);
          });
        }
      });
    });
  }));

  
};