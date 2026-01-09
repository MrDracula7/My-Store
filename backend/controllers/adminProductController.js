// const Product = require("../models/Product");

// exports.addProduct = async (req, res) => {
//   console.log("BODY:", req.body);
//   console.log("FILE:", req.file);

//   try {
//     const product = await Product.create({
//       name: req.body.name,
//       description: req.body.description,
//       category: req.body.category,
//       price: req.body.price,
//       discount: req.body.discount,
//       stock: req.body.stock,
//       image: {
//       url: String,
//       public_id: String
//       }
//     });

//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

exports.addProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount,
      stock: req.body.stock,
      image: {
        url: result.secure_url,      // ✅ real image URL
        public_id: result.public_id, // ✅ required for delete
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
