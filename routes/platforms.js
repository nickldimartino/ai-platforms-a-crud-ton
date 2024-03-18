// -------------------- Packages --------------------
var express = require('express');


// --------------------- Router ---------------------
var router = express.Router();


// ----------------- Required Files -----------------
var platformsCtrl = require("../controllers/platforms");
var ensureLoggedIn = require('../config/ensureLoggedIn');


// --------------------- Routes ---------------------
// GET route for the main AI Platform page
router.get('/', platformsCtrl.index);

// GET route to add a new AI Platform
router.get('/new', ensureLoggedIn, platformsCtrl.new);

// GET route to sort the AI Platform names in ascending order
router.get('/sortNamesAscend', ensureLoggedIn, platformsCtrl.sortNamesAscend);

// GET route to sort the AI Platform names in descending order
router.get('/sortNamesDescend', ensureLoggedIn, platformsCtrl.sortNamesDescend);

// GET route to sort the AI Platform industry in ascending order
router.get('/sortIndustryAscend', ensureLoggedIn, platformsCtrl.sortIndustryAscend);

// GET route to sort the AI Platform industry in descending order
router.get('/sortIndustryDescend', ensureLoggedIn, platformsCtrl.sortIndustryDescend);

// GET route to show the AI Platform to edit
router.get('/:id', ensureLoggedIn, platformsCtrl.show);

// POST route to add a new AI Platform to the AI Platforms page
router.post('/', ensureLoggedIn, platformsCtrl.create);

// POST route to edit the chosen AI Platform
router.post('/:id', ensureLoggedIn, platformsCtrl.edit);

// DELETE route to delete an AI Platform from the AI Platforms page
router.delete('/:id', ensureLoggedIn, platformsCtrl.delete);


// ---------------- Export the router ---------------
module.exports = router;
