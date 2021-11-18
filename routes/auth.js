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

