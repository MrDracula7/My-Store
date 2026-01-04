// const Otp = require("../models/otp");
// const sendEmail = require("../utils/sendEmail");

// exports.sendOtp = async (req, res) => {
//   const { email } = req.body;

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   await Otp.deleteMany({ email });

//   await Otp.create({
//     email,
//     otp,
//     expiresAt: new Date(Date.now() + 5 * 60 * 1000)
//   });

//   await sendEmail(email, otp);

//   res.json({ message: "OTP sent to email" });
// };

// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   const record = await Otp.findOne({ email, otp });

//   if (!record || record.expiresAt < Date.now()) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   await Otp.deleteMany({ email });

//   res.json({ message: "OTP verified" });
// };



const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");

// SEND OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Remove old OTPs
  await Otp.deleteMany({ email });

  await Otp.create({
    email,
    otp,
    verified: false,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  await sendEmail(email, otp);

  res.json({ message: "OTP sent to email" });
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const record = await Otp.findOne({ email, otp });

  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (record.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  // 🔥 THIS WAS MISSING
  record.verified = true;
  await record.save();

  res.json({ message: "Email verified successfully" });
};

