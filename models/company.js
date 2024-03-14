const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String,
    yearCreated: Number,
    website: String,
    versions: []
});

module.exports = mongoose.model("Platform", programSchema);