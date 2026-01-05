const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String } // profile image URL
});

module.exports = mongoose.model("User", userSchema);


