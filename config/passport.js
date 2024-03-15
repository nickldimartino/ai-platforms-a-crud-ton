// -------------------- Packages --------------------
const User = require('../models/user');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use Google Strategy to sign a user in with OAuth
passport.use(new GoogleStrategy(
    // configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },

    // verify callback function to log in the user
    async function(accessToken, refreshToken, profile, cb) {}
));

// Use Google Stretagy to create a user and give it to passport
passport.use(new GoogleStrategy(
  // configuration object
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  // verify callback function to try and create a user with passport
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // find the user in the database by it's profile id
      let user = await User.findOne({ googleId: profile.id });
      
      // provide found user to passport
      if (user) return cb(null, user);
      
      // create the new user object
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });

      // return the user
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

// serialize the data of the user for the session
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

// deserialize the user's documents when a request comes from an existing user
passport.deserializeUser(async function(userId, cb) {
  // It's nice to be able to use await in-line!
  cb(null, await User.findById(userId));
});
  