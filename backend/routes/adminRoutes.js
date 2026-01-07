const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  getAllUsers,
  getUserCount,
  toggleBlockUser,
  deleteUser
} = require("../controllers/adminUserController");

router.get("/users", adminAuth, getAllUsers);
router.get("/users/count", adminAuth, getUserCount);
router.patch("/users/:id/block", adminAuth, toggleBlockUser);
router.delete("/users/:id", adminAuth, deleteUser);

module.exports = router;
