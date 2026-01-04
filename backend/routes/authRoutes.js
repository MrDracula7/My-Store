// const express = require("express");
// const router = express.Router();
// const { signup, login } = require("../controllers/authController");

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;


// import express from "express";
const express = require("express");
// import { signup, login } from "../controllers/authController.js";
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// export default router;
module.exports = router;
