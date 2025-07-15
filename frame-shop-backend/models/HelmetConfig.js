const mongoose = require("mongoose");

const helmetConfigSchema = new mongoose.Schema({
    helmet: { type: mongoose.Schema.Types.ObjectId, ref: "Helmet", required: true },
    configName: { type: String, required: true },
    size: {
        type: String,
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    color: { type: String, required: true },
    visorType: {
        type: String,
        enum: ['Clear', 'Tinted', 'Mirrored', 'Photochromic', 'Anti-Fog'],
        default: 'Clear'
    },
    ventilation: {
        type: String,
        enum: ['Basic', 'Advanced', 'Premium'],
        default: 'Basic'
    },
    padding: {
        type: String,
        enum: ['Standard', 'Comfort', 'Premium'],
        default: 'Standard'
    },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    customizationOptions: {
        graphics: { type: Boolean, default: false },
        customPaint: { type: Boolean, default: false },
        additionalVisors: { type: Boolean, default: false },
        communicationSystem: { type: Boolean, default: false }
    }
}, { timestamps: true });

module.exports = mongoose.model("HelmetConfig", helmetConfigSchema);
