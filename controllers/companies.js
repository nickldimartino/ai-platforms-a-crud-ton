// -------------------- Packages --------------------
const Company = require("../models/company");
const Platform = require("../models/platform");
const User = require("../models/user");


// ---------------- Export Functions ----------------
module.exports = {
    index,
    new: newCompany,
    create,
    edit
}


// -------------------- Functions -------------------
// Render the AI Platform's More Info page displaying Company Info
async function index(req, res) {
    // get the chosen platform in MongoDB and populate the company array with the reference ID
    const platform = await Platform.findById(req.params.id).populate("company");
    const user = await User.findById(req.user);

    // render the companies index page
    res.render("companies/index", {
        title: "Company's Info Page",
        platform,
        user,        
        errorMsg: ""
    });
}

// Render the new company page so a user can add the company info of the chosen AI Platform
function newCompany(req, res) {
    res.render("companies/new", {
        title: "Add Company Info to the AI Platform",
        platformId: req.params.id,
        errorMsg: ""
    });
}

// Create a new company and link it to it's specified AI Platform
async function create(req, res) {
    // get the chosen platform from MongoDB
    const platform = await Platform.findById(req.params.id);

    // create a company schema with the info from the user
    const company = await Company.create(req.body);

    // if the company object is empty, add the new company object to the chosen platform
    // and save it in MongoDB
    if (!platform.company) {
        platform.company = company;
        await platform.save();
    }

    // redirect the user to the AI Platform's Company page
    res.redirect(`/companies/${req.params.id}`);
}

// Edits the information of the company for the chosen AI Platform
async function edit(req, res) {
    // get the chosen platform from MongoDB
    const platform = await Platform.findById(req.params.id);

    // get the chosen company from MongoDB
    const company = await Company.findById(platform.company);
    // change the newly entered info to replace to old info
    company.name = req.body["company-name"];
    company.yearCreated = req.body["year-created"];
    company.website = req.body.website;
    
    // save the company object in MongoDB
    await company.save();
    
    // redirect the user to the AI Platform's Company page 
    res.redirect(`/companies/${req.params.id}`);
}
