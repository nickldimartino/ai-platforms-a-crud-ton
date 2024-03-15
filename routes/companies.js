var express = require('express');
var router = express.Router();
var companiesCtrl = require("../controllers/companies");
var ensureLoggedIn = require('../config/ensureLoggedIn');

// GET route for AI Platform's New Company page 
router.get('/new/:id', ensureLoggedIn, companiesCtrl.new);

// GET route for AI Platform page
router.get('/:id', ensureLoggedIn, companiesCtrl.index);

// POST route to edit the company info for the AI Platform
router.post("/:id/edit", ensureLoggedIn, companiesCtrl.edit);

// POST route to create the company info for the AI Platform
router.post("/:id", ensureLoggedIn, companiesCtrl.create);

module.exports = router;
