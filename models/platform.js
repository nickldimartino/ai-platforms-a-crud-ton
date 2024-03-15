// -------------------- Packages --------------------
const mongoose = require("mongoose");


// ------------- Mongoose Schema Creation -----------
const Schema = mongoose.Schema;


// ------------------ Platform Schema ---------------
const platformSchema = new Schema({
    name: String,
    description: {
        type: String,
        default: "No description"
    },
    industry: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    }
});

// ------------ Export the Platform Schema ----------
module.exports = mongoose.model("Platform", platformSchema);
