const Helmet = require("../models/Helmet");

// Get all helmets with filtering and pagination
exports.getAllHelmets = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      brand,
      size,
      minPrice,
      maxPrice,
      safetyRating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (size) filter.size = size;
    if (safetyRating) filter.safetyRating = safetyRating;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const helmets = await Helmet.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Helmet.countDocuments(filter);

    res.status(200).json({
      helmets,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error("Error fetching helmets:", err);
    res.status(500).json({ message: "Failed to fetch helmets", error: err.message });
  }
};

// Get single helmet by ID
exports.getHelmetById = async (req, res) => {
  try {
    const helmet = await Helmet.findById(req.params.id);

    if (!helmet) {
      return res.status(404).json({ message: "Helmet not found" });
    }

    res.status(200).json(helmet);
  } catch (err) {
    console.error("Error fetching helmet:", err);
    res.status(500).json({ message: "Failed to fetch helmet", error: err.message });
  }
};

// Get featured helmets
exports.getFeaturedHelmets = async (req, res) => {
  try {
    const helmets = await Helmet.find({ isFeatured: true, isActive: true }).limit(8);
    res.status(200).json(helmets);
  } catch (err) {
    console.error("Error fetching featured helmets:", err);
    res.status(500).json({ message: "Failed to fetch featured helmets", error: err.message });
  }
};

// Get helmets by category
exports.getHelmetsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const helmets = await Helmet.find({ category, isActive: true });
    res.status(200).json(helmets);
  } catch (err) {
    console.error("Error fetching helmets by category:", err);
    res.status(500).json({ message: "Failed to fetch helmets", error: err.message });
  }
};

// Get available brands
exports.getBrands = async (req, res) => {
  try {
    const brands = await Helmet.distinct('brand', { isActive: true });
    res.status(200).json(brands);
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ message: "Failed to fetch brands", error: err.message });
  }
};

// Get available categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Helmet.distinct('category', { isActive: true });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories", error: err.message });
  }
};

// Admin: Create new helmet
exports.createHelmet = async (req, res) => {
  try {
    const helmet = new Helmet(req.body);
    await helmet.save();
    res.status(201).json(helmet);
  } catch (err) {
    console.error("Error creating helmet:", err);
    res.status(500).json({ message: "Failed to create helmet", error: err.message });
  }
};

// Admin: Update helmet
exports.updateHelmet = async (req, res) => {
  try {
    const helmet = await Helmet.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!helmet) {
      return res.status(404).json({ message: "Helmet not found" });
    }

    res.status(200).json(helmet);
  } catch (err) {
    console.error("Error updating helmet:", err);
    res.status(500).json({ message: "Failed to update helmet", error: err.message });
  }
};

// Admin: Delete helmet
exports.deleteHelmet = async (req, res) => {
  try {
    const helmet = await Helmet.findByIdAndDelete(req.params.id);

    if (!helmet) {
      return res.status(404).json({ message: "Helmet not found" });
    }

    res.status(200).json({ message: "Helmet deleted successfully" });
  } catch (err) {
    console.error("Error deleting helmet:", err);
    res.status(500).json({ message: "Failed to delete helmet", error: err.message });
  }
};
