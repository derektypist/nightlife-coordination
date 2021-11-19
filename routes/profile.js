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

// Add Reservation
router.post('/addreservation/:zip_code/:name', isLoggedIn, function(req,res) {
  let userEmail = req.user.local.username || req.user.facebook.email;
  let placeName = req.params.name;
  let zipcode = req.params.zip_code;
  Place.findOne({"name": placeName}, function(err, place) {
    if (err) {
      console.log(err);
      return;
    }

    if (!place) {
      // no place for first time adding
      let myNewPlace = new Place();
      myNewPlace.name = placeName;
      myNewPlace.zip_code = zipcode;
      myNewPlace.reservedList.push(userEmail);
      myNewPlace.numgoing++;

      // Save place into place db
      myNewPlace.save(function(err) {
        if (err) {
          console.log(err);
        }

        // Push user to Reserved List
        console.log('New Place and New User Added');
        req.flash('reserveMessage', userEmail + ' reserved');
        res.redirect('/search/api/?search=' + zipcode);
      });
    }

    else if (place) {
      // Check if user has already reserved
      if (place.reservedList.includes(userEmail)) {
        // User already reserved
        console.log('You already reserved');
        req.flash('reserveMessage', 'You already reserved');
        res.redirect('/search/api/?search=' + zipcode);
      } else {
        // User has not reserved
        place.reservedList.push(userEmail);
        place.numgoing++;
        place.save(function(err) {
          if (err) {
            console.log(err);
          }

          req.flash('reserveMessage', userEmail + ' reserved');
          res.redirect('/search/api/?search=' + zipcode);
        });
      }
    }
  });
});

// Remove Reservation
router.post('/removereservation/:zip_code/:name', isLoggedIn, function(req, res) {
  let userEmail = req.user.local.username || req.user.facebook.email;
  let placeName = req.params.name;
  let zipcode = req.params.zip_code;
  Place.findOne({'name': placeName}, function(err,place) {
    if (err) {
      console.log(err);
      return;
    }

    // Place is already in the reserved list
    if (place) {
      // Check if current user is already in the list
      if (place.reservedList.includes(userEmail)) {
        // User is in the reservation list
        let index = place.reservedList.indexOf(userEmail);
        place.reservedList.splice(index, 1);
        place.numgoing--;
        console.log(`User with ${userEmail} has been removed from the list`);
        place.save(function(err) {
          if (err) {
            console.log(err);
            return;
          }

          req.flash('reserveMessage', userEmail + ' has been removed from the list');
          res.redirect('/search/api/?search=' + zipcode);
        });
      } else {
        // User is not in the reservation list
        req.flash('reserveMessage', 'You have not reserved at this place');
        res.redirct('/search/api/?search=' + zipcode);
      }
    } else {
      // Place is not added in the reserved list
      req.flash('reserveMessage', 'You have not reserved at this place.  Select Reserve.');
      res.redirect('/search/api/?search=' + zipcode);
    }
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