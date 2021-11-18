// Set Up Constants
const express = require('express');
const router = express.Router();
const Place = require('../models').Place;
const User = require('../models').User;

router.get('/*', isLoggedIn, function(req,res) {
  // Code
});

// Login Function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

module.exports = router;