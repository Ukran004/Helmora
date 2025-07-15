const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, shippingCost = 0, discount = 0, notes } = req.body;

    // ✅ Validate required fields
    if (!items || items.length === 0 || !totalAmount || !shippingAddress) {
      return res.status(400).json({ message: "Missing required order fields." });
    }

    // Validate each item has required fields
    for (const item of items) {
      if (!item.helmet || !item.price || !item.size || !item.color) {
        return res.status(400).json({
          message: "Each item must have helmet ID, price, size, and color."
        });
      }
    }

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      shippingCost,
      discount,
      notes,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await order.save();

    return res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order creation error:", err);
    return res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.helmet")
      .populate("items.config")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Failed to get orders", error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.helmet")
      .populate("items.config")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ message: "Failed to fetch all orders", error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.helmet")
      .populate("items.config");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    ).populate("user").populate("items.helmet");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ message: "Payment status is required" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    ).populate("user").populate("items.helmet");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Error updating payment status:", err);
    res.status(500).json({ message: "Failed to update payment status", error: err.message });
  }
};
