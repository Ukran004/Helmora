const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");

const {
    getAllHelmetConfigs,
    getHelmetConfigsByHelmet,
    createHelmetConfig,
    updateHelmetConfig,
    deleteHelmetConfig
} = require("../controllers/frameConfigController");

// Public routes
router.get("/", getAllHelmetConfigs);
router.get("/helmet/:helmetId", getHelmetConfigsByHelmet);

// Admin routes
router.post("/", protect, admin, createHelmetConfig);
router.put("/:id", protect, admin, updateHelmetConfig);
router.delete("/:id", protect, admin, deleteHelmetConfig);

module.exports = router;
