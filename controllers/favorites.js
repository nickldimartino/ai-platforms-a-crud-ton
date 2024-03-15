const Platform = require("../models/platform");
const User = require("../models/user");

module.exports = {
    index,
    create,
    delete: deleteFavorite
}

async function index(req, res) {
    const user = await User.findById(req.user._id).populate("favorites");

    res.render("favorites/index", {
        title: "Favorites List",
        user,
        errorMsg: ""
    });
}

async function create(req, res) {
    const platforms = await Platform.find({});
    const platform = await Platform.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(platform._id)) {
        user.favorites.push(platform._id);
        await user.save();
    }
    
    res.render("platforms/index", {
        title: "AI Platforms",
        platforms,
        errorMsg: ""
    });
}

async function deleteFavorite(req, res) {
    const platform = await Platform.findById(req.params.platformId);
    const user = await User.findById(req.params.userId).populate("favorites");

    user.favorites.remove(platform._id);
    await user.save();

    res.render(`favorites/index`, {
        title: "Favorites List",
        user,
        errorMsg: ""
    });
}
