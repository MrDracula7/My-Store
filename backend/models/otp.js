// const mongoose = require("mongoose");

// const otpSchema = new mongoose.Schema({
//   email: String,
//   otp: String,
//   expiresAt: Date
// });

// module.exports = mongoose.model("Otp", otpSchema);


// import mongoose from "mongoose";
const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  verified: { type: Boolean, default: false },
  expiresAt: Date
});

module.exports = mongoose.model("Otp", otpSchema);
