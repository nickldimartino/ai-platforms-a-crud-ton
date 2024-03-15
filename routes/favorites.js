// -------------------- Packages --------------------
var express = require('express');


// --------------------- Router ---------------------
var router = express.Router();


// ----------------- Required Files -----------------
var favoritesCtrl = require("../controllers/favorites");
var ensureLoggedIn = require('../config/ensureLoggedIn');


// --------------------- Routes ---------------------
// GET route for the User's Favorite's page
router.get('/index', ensureLoggedIn, favoritesCtrl.index);

// POST route to add an AI Platform to a User's Favorites page
router.post("/:id", ensureLoggedIn, favoritesCtrl.create);

// DELETE route to remove an AI Platform from a Users Favorites page
router.delete("/:userId/:platformId", ensureLoggedIn, favoritesCtrl.delete);


// ---------------- Export the router ---------------
module.exports = router;
