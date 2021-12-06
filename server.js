const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const url = require('./config/db.js').url;
mongoose.connect(url);
const passport = require('passport');
const flash = require('connect-flash');
const Yelp = require('yelp');
const app = express();

// App Configuration
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req,res,next) {
  res.locals.user = req.user;
  next();
});

// DB
let db = mongoose.connection;
db.on('error',function(err) {
  console.log(`Unable to connect to DB: ${db}`);
});
db.on('open', function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Connected to DB');
});

const User = require('./models').User;
const Place = require('./models').Place;

// Passport Configuration
require('./config/passport.js')(passport);

// Yelp
const client = require('./config/yelp.js');

// Routes and App Start
const auth = require('./routes/auth.js');
app.use('/auth',auth);
const profile = require('./routes/profile.js');
app.use('./profile',profile);
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.get('/', function(req, res) {
  let responseArr = [];
  res.render('index', {title: "Home Page", responseArr: responseArr});
});

app.get('/search/api', function(req, res) {
  let searchInput = req.query.search;
  let yelpSearch = client.search({
    term: "bar",
    location: searchInput
  }).then(function(response) {
    let responseArr = response.jsonBody.businesses;
    res.render('searchresult', {title: "Search Result", responseArr: responseArr, message: req.flash('reserveMessage')});
  }).catch(function(e) {
    console.log(e);
    res.status(404).send('There is an error or please make sure you enter correct input requirement');
  });
});

// Start Server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
