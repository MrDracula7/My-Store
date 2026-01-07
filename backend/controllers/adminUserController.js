const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.getUserCount = async (req, res) => {
  const count = await User.countDocuments();
  res.json({ count });
};
