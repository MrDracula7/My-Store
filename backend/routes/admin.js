const express = require("express");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/dashboard", adminAuth, (req, res) => {
  res.json({
    message: "Welcome Admin",
    adminId: req.admin.id
  });
});

module.exports = router;
