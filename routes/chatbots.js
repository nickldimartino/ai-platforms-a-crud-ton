// -------------------- Packages --------------------
var express = require('express');


// --------------------- Router ---------------------
var router = express.Router();


// ----------------- Required Files -----------------
var chatbotsCtrl = require("../controllers/chatbots");
var ensureLoggedIn = require('../config/ensureLoggedIn');


// --------------------- Routes ---------------------
// GET route for the chatbot's index page 
router.get('/index', ensureLoggedIn, chatbotsCtrl.index);

// POST route to generate a new AI chat from the prompt
router.post("/new", ensureLoggedIn, chatbotsCtrl.new);  


// ---------------- Export the router ---------------
module.exports = router;
