var express = require('express');
var router = express.Router();
var favoritesCtrl = require("../controllers/favorites");
var ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
router.get('/index', favoritesCtrl.index);

// POST route to add an AI Platform to a Users favorites list
router.post("/:id", ensureLoggedIn, favoritesCtrl.create);

// DELETE route to remove an AI Platform from a Users favorites list
router.delete("/:userId/:platformId", ensureLoggedIn, favoritesCtrl.delete);

module.exports = router;