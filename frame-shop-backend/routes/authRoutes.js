// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { register, login, verifyOtp } = require("../controllers/authController");

router.post("/register", register);
router.post("/verify-otp", verifyOtp); // ✅ NEW: OTP verification
router.post("/login", login);

module.exports = router;