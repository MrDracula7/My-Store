const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount,
      stock: req.body.stock,
      isActive: req.body.isActive,
      image: req.file.path   // Cloudinary URL
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
