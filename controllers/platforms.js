// -------------------- Packages --------------------
const Platform = require("../models/platform");
const Company = require("../models/company");
const User = require("../models/user");


// ---------------- Export Functions ----------------
module.exports = {
    index,
    new: newPlatform,
    create,
    edit,
    delete: deletePlatform,
    show
}


// -------------------- Functions -------------------
// Render the AI Platform's Index page with all the AI Platform's in MongoDB
async function index(req, res) {
    const platforms = await Platform.find({});
    res.render("platforms/index", {
        title: "AI Platforms: A CRUD-ton!",
        platforms,
        errorMsg: ""
    });
}

// Render the New AI Platform page to allow users to add a new AI Platform
function newPlatform(req, res) {
    res.render("platforms/new", {
        title: "Add a New AI Platform",
        errorMsg: ""
    });
}

// Create a new AI Platform and redirect the user to the AI Platform's page to render it
async function create(req, res) {
    // try to create an AI Platform in MongoDB from the user's inputted info
    // if it works, go to the AI Platform's page
    // else, catch the error and go to the new AI Platform page to allow the user to try again
    try {
        await Platform.create(req.body);
        res.redirect("platforms");
    } catch (err) {
        console.log(err);
        res.render("platforms/new", {
            title: "Add an AI Platform",
            errorMsg: ""
        });
    }
}

// Edit the chosen AI Platform's info
async function edit(req, res) {
    // get the chocen AI Platform in MongoDB
    const platform = await Platform.findById(req.params.id);
    
    // replace the info stored in the platform object with the user inputted info
    platform.name = req.body.name;
    platform.description = req.body.description;
    platform.industry = req.body.industry;
    
    // save the new AI Platform data in MongoDB
    await platform.save();
    
    // redirect the user to the AI Platform page
    res.redirect("/platforms");
}

// Delete the chosen AI Platform
async function deletePlatform(req, res) {
    // get the chocsen AI Platform from MongoDB
    const platform = await Platform.findById(req.params.id);

    // get the signed-in user's data from MongoDB
    const user = await User.findById(req.user);

    // delete the company associated with the chosen AI Platform from MongoDB
    await Company.findOneAndDelete({ _id: platform.company });

    // delete the chosen AI Platform from MOongoDB
    await Platform.findOneAndDelete({ _id: platform });

    // remove the chosen AI Platform from the user's favorite's array
    user.favorites.remove(platform._id);

    // save the user's data in MongoDB
    await user.save()
    
    // redirect the user to the AI Platform's page
    res.redirect("/platforms");
}

// Render the AI Platform's edit page
async function show(req, res) {
    // get the chosen AI Platform from MongoDB and populate it's company array
    const platform = await Platform.findById(req.params.id).populate("company");

    // render the AI Platform's edit page with the chosen AI Platform
    res.render("platforms/edit", {
        title: "Edit the AI Platform Info",
        platform,
        errorMsg: ""
    });
}
