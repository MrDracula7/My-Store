const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/**
 * GET PRODUCTS FOR HOMEPAGE
 * /api/products?type=trending
 */
router.get("/", async (req, res) => {
  try {
    const { type, category, limit = 10 } = req.query;

    let filter = { isActive: true };

    // Optional logic (can improve later)
    if (category) {
      filter.category = category;
    }

    let products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
