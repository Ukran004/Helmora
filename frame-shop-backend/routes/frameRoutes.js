const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");

const {
  getAllHelmets,
  getHelmetById,
  getFeaturedHelmets,
  getHelmetsByCategory,
  getBrands,
  getCategories,
  createHelmet,
  updateHelmet,
  deleteHelmet
} = require("../controllers/frameController");

// Public routes
router.get("/", getAllHelmets);
router.get("/featured", getFeaturedHelmets);
router.get("/categories", getCategories);
router.get("/brands", getBrands);
router.get("/category/:category", getHelmetsByCategory);
router.get("/:id", getHelmetById);

// Admin routes
router.post("/", protect, admin, createHelmet);
router.put("/:id", protect, admin, updateHelmet);
router.delete("/:id", protect, admin, deleteHelmet);

module.exports = router;
