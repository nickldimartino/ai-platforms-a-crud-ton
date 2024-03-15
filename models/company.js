// -------------------- Packages --------------------
const mongoose = require("mongoose");


// ------------- Mongoose Schema Creation -----------
const Schema = mongoose.Schema;


// ------------------ Company Schema ----------------
const companySchema = new Schema({
    name: String,
    yearCreated: Number,
    website: String
});


// ------------ Export the Company Schema -----------
module.exports = mongoose.model("Company", companySchema);
