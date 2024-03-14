var express = require('express');
var router = express.Router();
var favoritesCtrl = require("../controllers/favorites");

/* GET users listing. */
router.get('/index', favoritesCtrl.index);

module.exports = router;