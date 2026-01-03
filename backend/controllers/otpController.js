const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email });

  await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  await sendEmail(email, otp);

  res.json({ message: "OTP sent to email" });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await Otp.findOne({ email, otp });

  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await Otp.deleteMany({ email });

  res.json({ message: "OTP verified" });
};
