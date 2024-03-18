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

// GET route to sort the AI Platform names in ascending order on the favorites page
router.get('/sortNamesAscend', ensureLoggedIn, favoritesCtrl.sortNamesAscend);

// GET route to sort the AI Platform names in descending order on the favorites page
router.get('/sortNamesDescend', ensureLoggedIn, favoritesCtrl.sortNamesDescend);

// GET route to sort the AI Platform industry in ascending order on the favorites page
router.get('/sortIndustryAscend', ensureLoggedIn, favoritesCtrl.sortIndustryAscend);

// GET route to sort the AI Platform industry in descending order on the favorites page
router.get('/sortIndustryDescend', ensureLoggedIn, favoritesCtrl.sortIndustryDescend);

// POST route to add an AI Platform to a User's Favorites page
router.post("/:id", ensureLoggedIn, favoritesCtrl.create);

// DELETE route to remove an AI Platform from a Users Favorites page
router.delete("/:userId/:platformId", ensureLoggedIn, favoritesCtrl.delete);


// ---------------- Export the router ---------------
module.exports = router;
