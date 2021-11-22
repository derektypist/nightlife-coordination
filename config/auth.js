module.exports = {
  "facebookAuth": {
    "clientID": process.env.FB_CLIENT_ID,
    "clientSecret": process.env.FB_CLIENT_SECRET,
    "callbackURL": "https://nightlife-coordination.ddxps46.repl.co/auth/facebook/callback",
    'profileFields': ['id','displayName','email','birthday','friends','first_name','last_name','middle_name','gender','link']
  }
};