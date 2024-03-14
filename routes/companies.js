var express = require('express');
var router = express.Router();
var companiesCtrl = require("../controllers/companies");

// GET route for AI Platform's New Company page 
router.get('/new/:id', companiesCtrl.new);

// GET route for AI Platform page
router.get('/:id', companiesCtrl.index);

// POST route to edit the company info for the AI Platform
router.post("/:id/edit", companiesCtrl.edit);

// POST route to create the company info for the AI Platform
router.post("/:id", companiesCtrl.create);

module.exports = router;
