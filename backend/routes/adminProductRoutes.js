// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const adminAuth = require("../middleware/adminAuth");
// const upload = require("../middleware/upload");
// const { addProduct } = require("../controllers/adminProductController");

// // Get all products
// router.get("/", adminAuth, async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // Add product
// // router.post("/", adminAuth, async (req, res) => {
// //   const product = await Product.create(req.body);
// //   res.json(product);
// // });

// // Update product
// router.put("/:id", adminAuth, async (req, res) => {
//   const product = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(product);
// });

// // Delete product
// router.delete("/:id", adminAuth, async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// });

// // Activate / Deactivate
// router.patch("/:id/status", adminAuth, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   product.isActive = !product.isActive;
//   await product.save();
//   res.json(product);
// });

// //images
// router.post(
//   "/products",
//   adminAuth,
//   upload.single("image"),
//   addProduct
// );

// module.exports = router;

// module.exports = router;












const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");
const { addProduct } = require("../controllers/adminProductController");

// GET all products
router.get("/", adminAuth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product (WITH image)
router.post(
  "/",
  adminAuth,
  upload.single("image"),
  addProduct
);

// UPDATE product
// router.put("/:id", adminAuth, async (req, res) => {
//   const product = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(product);
// });
router.put(
  "/:id",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  }
);


// DELETE product
router.delete("/:id", adminAuth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// TOGGLE active
router.patch("/:id/status", adminAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.isActive = !product.isActive;
  await product.save();
  res.json(product);
});

module.exports = router;
