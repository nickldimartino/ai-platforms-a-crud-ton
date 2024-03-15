// -------------------- Packages --------------------
const Platform = require("../models/platform");
const User = require("../models/user");


// ---------------- Export Functions ----------------
module.exports = {
    index,
    create,
    delete: deleteFavorite
}


// -------------------- Functions -------------------
// Render the Favorite's page of the signed-in user
async function index(req, res) {
    // get the singed-in user's data from MongoDB and populate it's favorite's array
    const user = await User.findById(req.user._id).populate("favorites");

    // render the Favorite's Index page of the signed-in user
    res.render("favorites/index", {
        title: "Favorites List",
        user,
        errorMsg: ""
    });
}

// Add a new favorited AI Platform to the user's Favorite's page
async function create(req, res) {
    // get all the AI Platforms data from MongoDB
    const platforms = await Platform.find({});

    // get the chosen AI Platform's data from MongoDB
    const platform = await Platform.findById(req.params.id);

    // get the signed-in user's data from MongoDB
    const user = await User.findById(req.user._id);

    // if the signed-in user's favorite's array doesn't include the chosen AI Platform,
    // add if to the user's favorite's array and save it in MongoDB
    if (!user.favorites.includes(platform._id)) {
        user.favorites.push(platform._id);
        await user.save();
    }
    
    // render the AI Platform's Index page with all the AI platforms
    res.render("platforms/index", {
        title: "AI Platforms",
        platforms,
        errorMsg: ""
    });
}

// Delete the chosen AI Platform from the signed-in user's Favorite's page
async function deleteFavorite(req, res) {
    // get the chosen AI Platform from MongoDB 
    const platform = await Platform.findById(req.params.platformId);

    // get the signed-in user's data from MongoDB 
    const user = await User.findById(req.params.userId).populate("favorites");

    // remove the chosen AI Platform from the user's favroite's array
    user.favorites.remove(platform._id);

    // save the user's data in MongoDB
    await user.save();

    // render the user's Favorite's Index page
    res.render(`favorites/index`, {
        title: "Favorites List",
        user,
        errorMsg: ""
    });
}
