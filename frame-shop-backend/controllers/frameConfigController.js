const HelmetConfig = require("../models/HelmetConfig");

// Get all helmet configurations
exports.getAllHelmetConfigs = async (req, res) => {
  try {
    const configs = await HelmetConfig.find().populate('helmet');
    res.status(200).json(configs);
  } catch (err) {
    console.error("Error fetching helmet configs:", err);
    res.status(500).json({ message: "Failed to fetch helmet configs", error: err.message });
  }
};

// Get helmet configurations by helmet ID
exports.getHelmetConfigsByHelmet = async (req, res) => {
  try {
    const { helmetId } = req.params;
    const configs = await HelmetConfig.find({
      helmet: helmetId,
      isAvailable: true
    }).populate('helmet');
    res.status(200).json(configs);
  } catch (err) {
    console.error("Error fetching helmet configs:", err);
    res.status(500).json({ message: "Failed to fetch helmet configs", error: err.message });
  }
};

// Create new helmet configuration
exports.createHelmetConfig = async (req, res) => {
  try {
    const config = new HelmetConfig(req.body);
    await config.save();
    res.status(201).json(config);
  } catch (err) {
    console.error("Error creating helmet config:", err);
    res.status(500).json({ message: "Failed to create helmet config", error: err.message });
  }
};

// Update helmet configuration
exports.updateHelmetConfig = async (req, res) => {
  try {
    const config = await HelmetConfig.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!config) {
      return res.status(404).json({ message: "Helmet config not found" });
    }

    res.status(200).json(config);
  } catch (err) {
    console.error("Error updating helmet config:", err);
    res.status(500).json({ message: "Failed to update helmet config", error: err.message });
  }
};

// Delete helmet configuration
exports.deleteHelmetConfig = async (req, res) => {
  try {
    const config = await HelmetConfig.findByIdAndDelete(req.params.id);

    if (!config) {
      return res.status(404).json({ message: "Helmet config not found" });
    }

    res.status(200).json({ message: "Helmet config deleted successfully" });
  } catch (err) {
    console.error("Error deleting helmet config:", err);
    res.status(500).json({ message: "Failed to delete helmet config", error: err.message });
  }
};
