// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const adminAuth = require("../middleware/adminAuth");
// const upload = require("../middleware/upload");
// const { addProduct } = require("../controllers/adminProductController");

// // GET all products
// router.get("/", adminAuth, async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // ADD product (WITH image)
// router.post(
//   "/products",
//   adminAuth,
//   upload.single("image"),
//   addProduct
// );

// const cloudinary = require("../config/cloudinary");

// router.put(
//   "/:id",
//   adminAuth,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id);
//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       // 🔥 Delete old image if new image is uploaded
//       if (req.file && product.image?.public_id) {
//         await cloudinary.uploader.destroy(product.image.public_id);
//       }

//       // Update fields
//       product.name = req.body.name;
//       product.description = req.body.description;
//       product.category = req.body.category;
//       product.price = req.body.price;
//       product.discount = req.body.discount;
//       product.stock = req.body.stock;
//       product.isActive = req.body.isActive === "true";

//       // Save new image
//       if (req.file) {
//         product.image = {
//           url: req.file.path,
//           public_id: req.file.filename
//         };
//       }

//       await product.save();
//       res.json(product);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // DELETE product
// // const cloudinary = require("../config/cloudinary");

// router.delete("/:id", adminAuth, async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product?.image?.public_id) {
//     await cloudinary.uploader.destroy(product.image.public_id);
//   }

//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product and image deleted" });
// });


// // TOGGLE active
// router.patch("/:id/status", adminAuth, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   product.isActive = !product.isActive;
//   await product.save();
//   res.json(product);
// });

// module.exports = router;









const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

/* GET all products */
router.get("/", adminAuth, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
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
