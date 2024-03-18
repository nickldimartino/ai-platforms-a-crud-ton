// -------------------- Packages --------------------
var OpenAI = require("openai");
var GroqSDK = require("groq-sdk");
var { ChatGroq } = require("@langchain/groq");
var { ChatPromptTemplate } = require("@langchain/core/prompts");
var fs = require("node:fs/promises");
var { Document, Groq, VectorStoreIndex, serviceContextFromDefaults } = require("llamaindex");


// -------------------- API Keys --------------------
const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

const groqSdk = new GroqSDK((
    api_key = process.env.GROQ_API_KEY
));

const groq = new Groq((
    api_key = process.env.GROQ_API_KEY
));

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
});


// ---------------- Export Functions ----------------
module.exports = {
    index,
    newOpenAI: newOpenAI,
    newGroq: newGroq,
    newLangchain: newLangchain,
    newLlamaIndex: newLlamaIndex
}


// -------------------- Functions -------------------
// Render the Chatbots index page with empty AI chat responses
function index(req, res) {
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resGroq: "",
        resOpenAI: "",                                                           
        resLangchain: "",
        resLlamaIndex: "",
        errorMsg: ""
    });
}

// Render the AI response from Groq
async function newGroq(req, res) {
    const userPrompt = req.body.inputText;             // get the user inputted text

    // generate the response
    const completion = await groqSdk.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "mixtral-8x7b-32768",
    })
    .then((chatCompletion) => {
        // save the AI response
        resGroq = chatCompletion.choices[0]?.message?.content || "";

        // render the response on the Chatbots Index page
        res.render("chatbots/index", {
            title: "AI Chatbots",
            resOpenAI: "",
            resGroq,
            resLangchain: "",
            resLlamaIndex: "",
            errorMsg: ""
        });
    });
}

// Render the AI response from the OpenAI
async function newOpenAI(req, res) {
    const userPrompt = req.body.inputText;             // get the user inputted text

    // generate the response
    var resOpenAI = await openai.chat.completions.create({
        messages: [{ 
            role: "system", 
            content: userPrompt 
        }],
        model: "mixtral-8x7b-32768",
      });

      // save the AI response
    resOpenAI = resOpenAI.choices[0].message.content;

    // render the response on the Chatbots Index page
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resOpenAI,
        resGroq: "",
        resLangchain: "",
        resLlamaIndex: "",
        errorMsg: ""
    });
}

// Render the AI response from Langchain
async function newLangchain(req, res) {
    const userPrompt = req.body.inputText;             // get the user inputted text

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a helpful assistant"],
        ["human", "{input}"],
    ]);

    const chain = prompt.pipe(model);

    const response = await chain.invoke({
        input: userPrompt,
    });

    // save the AI response
    let resLangchain = response.content;
    
    // render the response on the Chatbots Index page
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resOpenAI: "",
        resGroq: "",
        resLangchain,
        resLlamaIndex: "",
        errorMsg: ""
    });
}

// Render the AI response from LlamaIndex
async function newLlamaIndex(req, res) {
    const userPrompt = req.body.inputText;             // get the user inputted text

    const serviceContext = serviceContextFromDefaults({ llm: groq });
    const path = "node_modules/llamaindex/examples/abramov.txt";
    const essay = await fs.readFile(path, "utf-8");
    const document = new Document({ text: essay, id_: "essay" });
    const index = await VectorStoreIndex.fromDocuments([document], {
        serviceContext,
    });
    const retriever = index.asRetriever();
    const queryEngine = index.asQueryEngine({
        retriever,
    });
    const query = userPrompt;
    const response = await queryEngine.query({
        query,
    });

    // save the AI response
    let resLlamaIndex = response;

    // render the response on the Chatbots Index page
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resOpenAI: "",
        resGroq: "",
        resLangchain: "",
        resLlamaIndex,
        errorMsg: ""
    });
}
