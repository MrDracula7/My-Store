// const User = require("../models/User");

/* Get all users */
// exports.getAllUsers = async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// };
const User = require("../models/User");

/* GET USERS WITH SEARCH + FILTER + PAGINATION */
exports.getAllUsers = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "all"
  } = req.query;

  const query = {};

  // Search by email
  if (search) {
    query.email = { $regex: search, $options: "i" };
  }

  // Filter by status
  if (status === "active") query.isBlocked = false;
  if (status === "blocked") query.isBlocked = true;

  const users = await User.find(query)
    .select("-password")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.json({
    users,
    total,
    pages: Math.ceil(total / limit)
  });
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

