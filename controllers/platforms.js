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
    show,
    sortNamesAscend,
    sortNamesDescend,
    sortIndustryAscend,
    sortIndustryDescend
}


// -------------------- Functions -------------------
// render the AI Platform's Index page with all the AI Platform's in MongoDB
async function index(req, res) {
    // get all of the AI Platforms from MongoDB
    const platforms = await Platform.find({});

    // get the signed-in user from MongoDB
    const user = await User.findById(req.user);

    // if a user signed-in, save the user favorites in an array
    let userFavorites = [];
    if (user) {
        userFavorites = user.favorites;
    }

    // render the AI Platforms Index page with teh AI Platforms and userFavorites
    res.render("platforms/index", {
        title: "AI Platforms: A CRUD-ton!",
        platforms,
        userFavorites,
        errorMsg: ""
    });
}

// render the New AI Platform page to allow users to add a new AI Platform
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

// edit the chosen AI Platform's info
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

// delete the chosen AI Platform
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

// render the AI Platform's edit page
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

// render the AI Platform's Index page with all the AI Platform's in MongoDB sorted by name in ascending order
async function sortNamesAscend(req, res) {
    // get all of the AI Platforms from MongoDB
    const platforms = await Platform.find({});

    // sort the AI Platforms in ascending order by name
    platforms.sort((a,b) => {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    // get the signed-in user from MongoDB
    const user = await User.findById(req.user);

    // if a user signed-in, save the user favorites in an array
    let userFavorites = [];
    if (user) {
        userFavorites = user.favorites;
    }

    // render the AI Platforms Index page with teh AI Platforms and userFavorites
    res.render("platforms/index", {
        title: "AI Platforms: A CRUD-ton!",
        platforms,
        userFavorites,
        errorMsg: ""
    });
}

// render the AI Platform's Index page with all the AI Platform's in MongoDB sorted by name in descending order
async function sortNamesDescend(req, res) {
    // get all of the AI Platforms from MongoDB
    const platforms = await Platform.find({});

    // sort the AI Platforms in descending order by name
    platforms.sort((a,b) => {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });

    // get the signed-in user from MongoDB
    const user = await User.findById(req.user);

    // if a user signed-in, save the user favorites in an array
    let userFavorites = [];
    if (user) {
        userFavorites = user.favorites;
    }

    // render the AI Platforms Index page with teh AI Platforms and userFavorites
    res.render("platforms/index", {
        title: "AI Platforms: A CRUD-ton!",
        platforms,
        userFavorites,
        errorMsg: ""
    });
}

// render the AI Platform's Index page with all the AI Platform's in MongoDB sorted by industry in ascending order
async function sortIndustryAscend(req, res) {
    // get all of the AI Platforms from MongoDB
    const platforms = await Platform.find({});

    // sort the AI Platforms in ascending order by industry
    platforms.sort((a,b) => {
        let textA = a.industry.toUpperCase();
        let textB = b.industry.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    // get the signed-in user from MongoDB
    const user = await User.findById(req.user);

    // if a user signed-in, save the user favorites in an array
    let userFavorites = [];
    if (user) {
        userFavorites = user.favorites;
    }

    // render the AI Platforms Index page with teh AI Platforms and userFavorites
    res.render("platforms/index", {
        title: "AI Platforms: A CRUD-ton!",
        platforms,
        userFavorites,
        errorMsg: ""
    });
}

// render the AI Platform's Index page with all the AI Platform's in MongoDB sorted by industry in descending order
async function sortIndustryDescend(req, res) {
    // get all of the AI Platforms from MongoDB
    const platforms = await Platform.find({});

    // sort the AI Platforms in descending order by industry
    platforms.sort((a,b) => {
        let textA = a.industry.toUpperCase();
        let textB = b.industry.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });

    // get the signed-in user from MongoDB
    const user = await User.findById(req.user);

    // if a user signed-in, save the user favorites in an array
    let userFavorites = [];
    if (user) {
        userFavorites = user.favorites;
    }

    // render the AI Platforms Index page with teh AI Platforms and userFavorites
    res.render("platforms/index", {
        title: "AI Platforms: A CRUD-ton!",
        platforms,
        userFavorites,
        errorMsg: ""
    });
}
