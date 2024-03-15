// -------------------- Packages --------------------
const mongoose = require('mongoose');


// ------------- Mongoose Schema Creation -----------
const Schema = mongoose.Schema;


// -------------------- User Schema ------------------
const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: "Platform"
    }]
  }, {
    timestamps: true
});


// ------------ Export the Company Schema -----------
module.exports = mongoose.model('User', userSchema);
