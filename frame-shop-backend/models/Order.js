const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    helmet: { type: mongoose.Schema.Types.ObjectId, ref: "Helmet", required: true },
    config: { type: mongoose.Schema.Types.ObjectId, ref: "HelmetConfig" }, // optional customization
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    size: { type: String, required: true },
    color: { type: String, required: true }
  }],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String,
  },
  paymentStatus: { type: String, default: "Pending" },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  totalAmount: { type: Number, required: true },
  khaltiPidx: { type: String }, // Khalti payment ID
  shippingCost: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  notes: String, // customer notes
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
