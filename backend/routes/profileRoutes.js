const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// router.put("/", auth, upload.single("photo"), async (req, res) => {
//   try {
//     const { name } = req.body;

//     const updateData = {};
//     if (name) updateData.name = name;

//     if (req.file) {
//       updateData.photo = `/uploads/${req.file.filename}`;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       updateData,
//       { new: true }
//     ).select("-password");

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Profile update failed" });
//   }
// });

// module.exports = router;



router.put("/", auth, upload.single("photo"), async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    console.log("REQ FILE:", req.file);

    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.file) updateData.photo = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
});

module.exports = router;
