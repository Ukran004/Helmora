const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");

const {
    placeOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus
} = require("../controllers/orderController");

// User routes
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getUserOrders);

// Admin routes
router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, admin, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.put("/:id/payment-status", protect, admin, updatePaymentStatus);

module.exports = router;
