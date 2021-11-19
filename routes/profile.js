// Set Up Constants
const express = require('express');
const router = express.Router();
const Place = require('../models').Place;
const User = require('../models').User;

router.get('/*', isLoggedIn, function(req,res) {
  Place.find({$or: [{reservedList: req.user.local.username}, {reservedList: req.user.facebook.email}]}, function(err,places) {
    if (err) {
      console.log(err);
      return;
    }

    res.render('profile', {title: "Profile", message: req.flash("reserveMessage"), places: places});
  });
});

router.get('/', isLoggedIn, function(req,res) {
  Place.find({$or: [{reservedList: req.user.local.username}, {reservedList: req.user.facebook.email}]}, function(err,places) {
    if (err) {
      console.log(err);
      return;
    }

    res.render('profile', {title: "Profile", message: req.flash("reserveMessage"), places: places});
  });
});

// Login Function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

module.exports = router;