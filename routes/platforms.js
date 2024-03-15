var express = require('express');
var router = express.Router();
var platformsCtrl = require("../controllers/platforms");
var ensureLoggedIn = require('../config/ensureLoggedIn');

// GET route for AI Platform page
router.get('/', platformsCtrl.index);

// GET route for new AI Platform page
router.get('/new', ensureLoggedIn, platformsCtrl.new);

// GET route to show the AI Platform to edit
router.get('/:id', ensureLoggedIn, platformsCtrl.show);

// POST route to add a new AI Platform to the AI Platforms page
router.post('/', ensureLoggedIn, platformsCtrl.create);

// POST route to edit the chosen AI Platform
router.post('/:id', ensureLoggedIn, platformsCtrl.edit);

// DELETE route to delete an AI Platform from the AI Platforms page
router.delete('/:id', ensureLoggedIn, platformsCtrl.delete);

module.exports = router;
