const Program = require("../models/platform");

module.exports = {
    index
}

function index(req, res) {
    res.render("favorites/index", {
        title: "Your Favorites List",
        errorMsg: ""
    });
}