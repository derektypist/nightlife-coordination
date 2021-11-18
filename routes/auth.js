const express = require('express');
const passport = require('passport');
const router = express.Router();

// Sign Up
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: "Sign Up",
    message: req.flash('signupMessage')
  });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/auth/login',
  failureRedirect: '/auth/signup',
  failureFlash: true
}));

// Login
router.get('/login', (req, res) => {
  res.render('login', {
    title: "Login",
    message: req.flash('loginMessage')
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// Facebook Login with Extended Permissions
router.get('/facebook', passport.authenticate('facebook', {scope: ['user_friends', 'email', 'public_profile']}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/auth/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;