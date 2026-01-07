const User = require("../models/User");

/* Get all users */
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/* Get user count */
exports.getUserCount = async (req, res) => {
  const count = await User.countDocuments();
  res.json({ count });
};

/* Block / Unblock user */
exports.toggleBlockUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: user.isBlocked ? "User blocked" : "User unblocked",
    isBlocked: user.isBlocked
  });
};

/* Delete user */
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted" });
};

