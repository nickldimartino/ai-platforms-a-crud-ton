var OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports = {
    index,
    new: newText
}

function index(req, res) {
    res.render("chatbots/index", {
        title: "Try the Chatbot AI",
        response: "",
        errorMsg: ""
    });
}

async function newText(req, res) {
    const userPrompt = req.body.inputText;
    var response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role":"user","content":userPrompt}],
      max_tokens: 50
    });
    response = response.choices[0].message.content;

    res.render("chatbots/index", {
        title: "Try the Chatbot AI",
        response,
        errorMsg: ""
    });
}
