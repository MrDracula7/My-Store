// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const auth = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");

// router.put("/", auth, upload.single("photo"), async (req, res) => {
//   try {
//     const updateData = {};

//     if (req.body.name) updateData.name = req.body.name;

//     if (req.file) {
//       updateData.photo = req.file.path; // Cloudinary URL
//     }

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       updateData,
//       { new: true }
//     ).select("-password");

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Profile update failed" });
//   }
// });


const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.put("/", auth, upload.single("photo"), async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.file) updateData.photo = req.file.path; // Cloudinary URL

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
});

module.exports = router;   // 🔴 THIS MUST EXIST
