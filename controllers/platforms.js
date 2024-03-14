const Platform = require("../models/platform");

module.exports = {
    new: newPlatform
}

function newPlatform(req, res) {
    res.render("platforms/new", {
        title: "Add a New AI Platform"
    });
}
