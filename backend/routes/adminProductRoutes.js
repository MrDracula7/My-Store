const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

/* GET all products */
// router.get("/", adminAuth, async (req, res) => {
//   const products = await Product.find().sort({ createdAt: -1 });
//   res.json(products);
// });
router.get("/", adminAuth, async (req, res) => {
  const {
    search = "",
    minPrice,
    maxPrice,
    stock,
    status,
    page = 1,
    limit = 10
  } = req.query;

  const query = {};

  /* SEARCH */
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } }
    ];
  }

  /* PRICE FILTER */
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  /* STOCK FILTER */
  if (stock === "in") query.stock = { $gt: 0 };
  if (stock === "out") query.stock = 0;

  /* STATUS FILTER */
  if (status === "active") query.isActive = true;
  if (status === "inactive") query.isActive = false;

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({
    products,
    total,
    pages: Math.ceil(total / limit)
  });
});


/* ADD product */
router.post(
  "/",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        discount: req.body.discount,
        stock: req.body.stock,
        isActive: req.body.isActive !== "false",
        image: req.file
          ? {
              url: req.file.path,
              public_id: req.file.filename
            }
          : null
      });

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/* UPDATE product */
router.put(
  "/:id",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    // delete old image if new uploaded
    if (req.file && product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        isActive: req.body.isActive !== "false",
        image: req.file
          ? {
              url: req.file.path,
              public_id: req.file.filename
            }
          : product.image
      },
      { new: true }
    );

    res.json(updated);
  }
);

/* DELETE product */
router.delete("/:id", adminAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product?.image?.public_id) {
    await cloudinary.uploader.destroy(product.image.public_id);
  }

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

/* TOGGLE status */
router.patch("/:id/status", adminAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.isActive = !product.isActive;
  await product.save();
  res.json(product);
});

module.exports = router;
