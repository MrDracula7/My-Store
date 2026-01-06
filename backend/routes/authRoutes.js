const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// module.exports = router;

//dashboard route
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/dashboard", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;

// //profile route
// const upload = require("../middleware/upload");

// router.put("/profile", auth, upload.single("photo"), async (req, res) => {
//   const { name } = req.body;

//   const updateData = { name };

//   if (req.file) {
//     updateData.photo = `/uploads/${req.file.filename}`;
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user.id,
//     updateData,
//     { new: true }
//   ).select("-password");

//   res.json(user);
// });

// module.exports = router;




