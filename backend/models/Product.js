

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  discount: Number,
  stock: Number,
  image: {
  url: String,
  public_id: String
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);


