// -------------------- Packages --------------------
var express = require('express');
var passport = require('passport');
var platformsCtrl = require("../controllers/platforms");


// --------------------- Router ---------------------
var router = express.Router();


// --------------------- Routes ---------------------
// GET route to the Platforms Index Page
router.get('/', platformsCtrl.index);

// GET route to the Google OAuth login
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// GET rpite to the Google OAuth callback
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// GET route to the OAuth logout
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});


// ---------------- Export the router ---------------
module.exports = router;
