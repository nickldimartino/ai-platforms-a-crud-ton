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

// POST route to generate a new OpenAI chat from the prompt
router.post("/newOpenAI", ensureLoggedIn, chatbotsCtrl.newOpenAI);  

// POST route to generate a new Groq AI chat from the prompt
router.post("/newGroq", ensureLoggedIn, chatbotsCtrl.newGroq);  

// POST route to generate a new Langchain AI chat from the prompt
router.post("/newLangchain", ensureLoggedIn, chatbotsCtrl.newLangchain);  

// POST route to generate a new Langchain AI chat from the prompt
router.post("/newLlamaIndex", ensureLoggedIn, chatbotsCtrl.newLlamaIndex);  


// ---------------- Export the router ---------------
module.exports = router;
