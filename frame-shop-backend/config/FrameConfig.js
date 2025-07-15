const mongoose = require("mongoose");

const frameConfigSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  frame: { type: mongoose.Schema.Types.ObjectId, ref: "Frame", required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  matting: { type: Boolean, default: false },
  glass: { type: Boolean, default: false },
  imageUrl: { type: String }, // uploaded preview
  configName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("FrameConfig", frameConfigSchema);
