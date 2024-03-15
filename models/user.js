const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Platform = require("../models/platform");

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

module.exports = mongoose.model('User', userSchema);
