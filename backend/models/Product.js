

const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   category: String,
//   price: Number,
//   discount: Number,
//   stock: Number,
//   image: {
//   url: String,
//   public_id: String
//   },
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,

  category: {
    type: String,
    required: true
  },
  subCategory: {
  type: String,
  required: false,
  trim: true
  },

  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true },

  specifications: {
    type: Map,
    of: String
  },

  variants: [
  {
    attributes: {
      type: Map,
      of: String
    },
    price: Number,
    stock: Number
    }
  ],
  hasVariants: { type: Boolean, default: false },
  
  image: {
    url: String,
    public_id: String
  },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);
