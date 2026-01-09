const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");
const slugify = require("slugify");

/* CREATE */
router.post(
  "/",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      const category = new Category({
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
        icon: req.body.icon,
        isActive: req.body.isActive === "true"
      });

      if (req.file) {
        category.image = {
          url: req.file.path,
          public_id: req.file.filename
        };
      }

      await category.save();
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/* GET ALL */
router.get("/", adminAuth, async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

/* TOGGLE STATUS */
router.patch("/:id/status", adminAuth, async (req, res) => {
  const category = await Category.findById(req.params.id);
  category.isActive = !category.isActive;
  await category.save();
  res.json(category);
});

/* DELETE */
router.delete("/:id", adminAuth, async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category.image?.public_id) {
    await cloudinary.uploader.destroy(category.image.public_id);
  }

  await category.deleteOne();
  res.json({ message: "Category deleted" });
});

module.exports = router;
