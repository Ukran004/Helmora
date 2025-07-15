const mongoose = require("mongoose");

const helmetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Full Face', 'Half Face', 'Modular', 'Off-Road', 'Sport', 'Touring', 'Dual Sport']
  },
  size: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  color: { type: String, required: true },
  material: { type: String, required: true },
  weight: { type: Number, required: true }, // in grams
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 }, // percentage
  stock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  features: [String], // array of features
  safetyRating: {
    type: String,
    enum: ['DOT', 'ECE', 'SNELL', 'SHARP', 'FIM'],
    required: true
  },
  images: [String], // array of image URLs
  mainImage: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  tags: [String], // for search functionality
  specifications: {
    shellMaterial: String,
    linerMaterial: String,
    visorType: String,
    ventilation: String,
    weight: Number,
    certification: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Helmet", helmetSchema);
