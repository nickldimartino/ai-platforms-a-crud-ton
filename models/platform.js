const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const platformSchema = new Schema({
    name: String,
    description: {
        type: String,
        default: "No description"
    },
    industry: String,
    company: [{
        type: Schema.Types.ObjectId,
        ref: "Company"
    }]
});

module.exports = mongoose.model("Platform", platformSchema);
