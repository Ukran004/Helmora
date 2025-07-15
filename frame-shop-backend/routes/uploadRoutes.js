const express = require("express");
const router = express.Router();

const parser = require("../middleware/upload");
const { protect } = require("../middleware/auth"); // ✅ FIXED: named import

// ✅ Upload image to Cloudinary
router.post("/image", protect, parser.single("image"), (req, res) => {
    try {
        res.status(200).json({ imageUrl: req.file.path });
    } catch (err) {
        res.status(500).json({ message: "Upload failed", error: err.message });
    }
});

module.exports = router;
