// const express = require("express");
// const router = express.Router();
// const { signup, login } = require("../controllers/authController");

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;


import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
