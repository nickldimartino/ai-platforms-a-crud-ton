const Platform = require("../models/platform");
const Company = require("../models/company");

module.exports = {
    new: newPlatform,
    index,
    create,
    show,
    delete: deletePlatform,
    edit
}

function newPlatform(req, res) {
    res.render("platforms/new", {
        title: "Add a New AI Platform",
        errorMsg: ""
    });
}

async function index(req, res) {
    const platforms = await Platform.find({});
    res.render("platforms/index", {
        title: "AI Platforms",
        platforms,
        errorMsg: ""
    });
}

async function show(req, res) {
    const platform = await Platform.findById(req.params.id).populate("company");
    res.render("platforms/edit", {
        title: "Edit the AI Platform Info",
        platform,
        errorMsg: ""
    });
}

async function create(req, res) {
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

async function deletePlatform(req, res) {
    const platform = await Platform.findById(req.params.id);

    await Company.findOneAndDelete({ _id: platform.company[0] });
    await Platform.findOneAndDelete({ _id: platform });

    res.redirect("/platforms");
}

async function edit(req, res) {
    const platform = await Platform.findById(req.params.id);
    
    platform.name = req.body.name;
    platform.description = req.body.description;
    platform.industry = req.body.industry;
    
    await platform.save();
    
    res.redirect("/platforms");
}
