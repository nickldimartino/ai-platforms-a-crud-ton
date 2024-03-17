// -------------------- Packages --------------------
var OpenAI = require("openai");


// ----------------- OpenAI API Key -----------------
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// ---------------- Export Functions ----------------
module.exports = {
    index,
    new: newText
}


// -------------------- Functions -------------------
// Render the Chatbots index page
function index(req, res) {
    res.render("chatbots/index", {
        title: "Chatbot AI",
        response: "",                                  // initialize the user response to an empty string
        errorMsg: ""
    });
}

// Render the AI response from the OpenAI Chatbot
async function newText(req, res) {
    const userPrompt = req.body.inputText;             // get the user inputted text

    // generate the response from the OpenAI API
    var response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            "role": "user",
            "content": userPrompt                      // user inputted text to be generated from 
        }],
        max_tokens: 100                                // max number of characters to generate
    });
    response = response.choices[0].message.content;    // get the generated response from the generated object

    // render the response on the Chatbots Index page
    res.render("chatbots/index", {
        title: "Chatbot AI",
        response,
        errorMsg: ""
    });
}
