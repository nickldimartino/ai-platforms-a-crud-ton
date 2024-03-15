var express = require('express');
var router = express.Router();
var chatbotsCtrl = require("../controllers/chatbots");
var ensureLoggedIn = require('../config/ensureLoggedIn');

// GET route for Chatbot's page 
router.get('/index', ensureLoggedIn, chatbotsCtrl.index);

// GET route
router.post("/new", ensureLoggedIn, chatbotsCtrl.new);  

module.exports = router;