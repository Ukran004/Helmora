const express = require("express");
const router = express.Router();

const { createKhaltiPayment, verifyKhaltiPayment } = require("../controllers/paymentController");

// Test route
router.get("/test", (req, res) => {
    res.json({ message: "Khalti Payments route active ✅" });
});

// Create Khalti payment
router.post("/create-khalti-payment", createKhaltiPayment);

// Verify Khalti payment
router.post("/verify-khalti-payment", verifyKhaltiPayment);

module.exports = router;
