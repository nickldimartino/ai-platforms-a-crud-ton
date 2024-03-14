var express = require('express');
var router = express.Router();
var platformsCtrl = require("../controllers/platforms");

/* GET users listing. */
router.get('/new', platformsCtrl.new);

module.exports = router;
