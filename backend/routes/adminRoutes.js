const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  getAllUsers,
  getUserCount
} = require("../controllers/adminUserController");

router.get("/users", adminAuth, getAllUsers);
router.get("/users/count", adminAuth, getUserCount);

module.exports = router;
