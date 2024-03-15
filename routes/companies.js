// -------------------- Packages --------------------
var express = require('express');


// --------------------- Router ---------------------
var router = express.Router();


// ----------------- Required Files -----------------
var companiesCtrl = require("../controllers/companies");
var ensureLoggedIn = require('../config/ensureLoggedIn');


// --------------------- Routes ---------------------
// GET route to add Company info for the chosen AI Platform's
router.get('/new/:id', ensureLoggedIn, companiesCtrl.new);

// GET route for the AI Platform's Company page
router.get('/:id', ensureLoggedIn, companiesCtrl.index);

// POST route to edit the company info for the AI Platform
router.post("/:id/edit", ensureLoggedIn, companiesCtrl.edit);

// POST route to create the company info for the AI Platform
router.post("/:id", ensureLoggedIn, companiesCtrl.create);


// ---------------- Export the router ---------------
module.exports = router;
