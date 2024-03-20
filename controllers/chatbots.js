// -------------------- Packages --------------------
var GroqSDK = require("groq-sdk");
var OpenAI = require("openai");
var { ChatGroq } = require("@langchain/groq");
var { ChatPromptTemplate } = require("@langchain/core/prompts");
var fs = require("node:fs/promises");
var { Document, Groq, VectorStoreIndex, serviceContextFromDefaults } = require("llamaindex");


// -------------------- API Keys --------------------
// for use in the Groq Chatbot
const groqSdk = new GroqSDK((
    api_key = process.env.GROQ_API_KEY
));

// for use in the OpenAI Chatbot
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// for use in the OpenAI Chatbot
const openaiGroq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

// for use in the Langchain Chatbot
const groq = new Groq((
    api_key = process.env.GROQ_API_KEY
));

// for use in the LlamaIndex Chatbot
const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
});


// ---------------- Export Functions ----------------
module.exports = {
    index,
    newGroq,
    newOpenAI,
    newImage,
    newLangchain,
    newLlamaIndex
}


// -------------------- Functions -------------------
// Render the Chatbots index page with empty AI chat responses
function index(req, res) {
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resGroq: "",
        resOpenAI: "",     
        resDisplayImage: "",                                                      
        resLangchain: "",
        resLangchainImage: "",
        resLlamaIndex: "",
        errorMsg: ""
    });
}

// Render the AI response from Groq
async function newGroq(req, res) {
     // get the user inputted text
    const userPrompt = req.body.inputText;           

    // generate the response
    const completion = await groqSdk.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "mixtral-8x7b-32768",   // Large-Language Model (LLM)
    })
    .then((chatCompletion) => {
        // save the AI response
        resGroq = chatCompletion.choices[0]?.message?.content || "";

        // render the response on the Chatbots Index page
        res.render("chatbots/index", {
            title: "AI Chatbots",
            resGroq,
            resOpenAI: "",
            resDisplayImage: "",
            resLangchain: "",
            resLangchainImage: "",
            resLlamaIndex: "",
            errorMsg: ""
        });
    });
}

// Render the AI response from the OpenAI
async function newOpenAI(req, res) {
    // get the user inputted text
    const userPrompt = req.body.inputText;           

    // generate the response
    var resOpenAI = await openaiGroq.chat.completions.create({
        messages: [{ 
            role: "system", 
            content: userPrompt 
        }],
        model: "mixtral-8x7b-32768",    // Large-Language Model (LLM)
      });

    // save the AI response
    resOpenAI = resOpenAI.choices[0].message.content;

    // render the response on the Chatbots Index page
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resGroq: "",
        resOpenAI,
        resDisplayImage: "",
        resLangchain: "",
        resLangchainImage: "",
        resLlamaIndex: "",
        errorMsg: ""
    });
}

// Render the AI response image from the OpenAI
async function newImage(req, res) {
    // get the user inputted text
    const userPrompt = req.body.inputText;           

    // generate the response image
    var resImage = await openai.images.generate({
        prompt: userPrompt,
        n: 1,
        size: "512x512"
    });

    // save the AI response image
    resDisplayImage = resImage.data[0].url;

    // render the response image on the Chatbots Index page
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resGroq: "",
        resOpenAI: "",
        resDisplayImage,
        resLangchain: "",
        resLangchainImage: "",
        resLlamaIndex: "",
        errorMsg: ""
    });
}

// Render the AI response from Langchain
async function newLangchain(req, res) {
    // get the user inputted text
    const userPrompt = req.body.inputPrompt; 
    const userSystem = req.body.inputSystem; 

    // create the prompt template
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", `You are a ${userSystem}`],
        ["human", "{input}"],
    ]);

    let resImage = await openai.images.generate({
        prompt: userSystem,
        n: 1,
        size: "256x256"
    });

    // set up the Large-Language Model (LLM)
    const chain = prompt.pipe(model);

    // generate the response
    const response = await chain.invoke({
        input: userPrompt,
    });

    // save the AI response
    let resLangchain = response.content;
    let resLangchainImage = resImage.data[0].url;
    
    // render the response on the Chatbots Index page
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resGroq: "",
        resOpenAI: "",
        resDisplayImage: "",
        resLangchain,
        resLangchainImage,
        resLlamaIndex: "",
        errorMsg: ""
    });
}

// Render the AI response from LlamaIndex
async function newLlamaIndex(req, res) {
    // get the user inputted text
    const userPrompt = req.body.inputText;

    // use the Groq Large-Language Model (LLM)
    const serviceContext = serviceContextFromDefaults({ llm: groq });

    // provide document to train the AI on a specific set of data
    // Retrieval-Augmented Generation (RAG) - Providing an LLM with more info to "train the AI"
    const path = "node_modules/llamaindex/examples/abramov.txt";
    // const path = "me.txt";                         
    const essay = await fs.readFile(path, "utf-8");
    const document = new Document({ text: essay, id_: "essay" });

    // use the LLM and the document provided as a source of data
    const index = await VectorStoreIndex.fromDocuments([document], {
        serviceContext,
    });
    const retriever = index.asRetriever();
    const queryEngine = index.asQueryEngine({
        retriever,
    });
    
    // generate the response
    const query = userPrompt;
    const response = await queryEngine.query({
        query,
    });

    // save the AI response
    let resLlamaIndex = response;

    // render the response on the Chatbots Index page
    res.render("chatbots/index", {
        title: "AI Chatbots",
        resGroq: "",
        resOpenAI: "",
        resDisplayImage: "",
        resLangchain: "",
        resLangchainImage: "",
        resLlamaIndex,
        errorMsg: ""
    });
}
