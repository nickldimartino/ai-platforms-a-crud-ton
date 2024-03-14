const Company = require("../models/company");
const Platform = require("../models/platform");

module.exports = {
    index,
    create,
    new: newCompany
}

async function index(req, res) {
    const platform = await Platform.findById(req.params.id).populate("company");
    
    res.render("companies/index", {
        title: "Company's Info Page",
        platform,
        errorMsg: ""
    });
}

async function create(req, res) {
    const platform = await Platform.findById(req.params.id);
    const company = await Company.create(req.body);
    platform.company.push(company);
    await platform.save();
    res.redirect(`/companies/${req.params.id}`);
}

function newCompany(req, res) {
    res.render("companies/new", {
        title: "Add Company Info to the AI Platform",
        platformId: req.params.id,
        errorMsg: ""
    });
}