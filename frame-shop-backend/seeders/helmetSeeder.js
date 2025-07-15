const mongoose = require('mongoose');
const Helmet = require('../models/Helmet');
require('dotenv').config();

const sampleHelmets = [
    {
        name: "AGV K1 S",
        brand: "AGV",
        category: "Full Face",
        size: "M",
        color: "Matte Black",
        material: "Thermoplastic",
        weight: 1450,
        price: 25000,
        originalPrice: 28000,
        discount: 10,
        stock: 15,
        description: "The AGV K1 S is a lightweight, aerodynamic helmet designed for maximum comfort and safety. Features advanced ventilation system and removable liner.",
        features: [
            "Lightweight thermoplastic shell",
            "Advanced ventilation system",
            "Removable and washable liner",
            "DOT and ECE certified",
            "Aerodynamic design"
        ],
        safetyRating: "DOT",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        isActive: true,
        isFeatured: true,
        tags: ["sport", "racing", "lightweight", "ventilated"],
        specifications: {
            shellMaterial: "Thermoplastic",
            linerMaterial: "Multi-density EPS",
            visorType: "Clear",
            ventilation: "Advanced",
            weight: 1450,
            certification: "DOT/ECE"
        }
    },
    {
        name: "Shoei GT-Air II",
        brand: "Shoei",
        category: "Touring",
        size: "L",
        color: "Glossy White",
        material: "Advanced Integrated Matrix Plus",
        weight: 1650,
        price: 45000,
        originalPrice: 48000,
        discount: 6,
        stock: 8,
        description: "Premium touring helmet with integrated sun visor and excellent noise reduction. Perfect for long-distance riding.",
        features: [
            "Integrated sun visor",
            "Advanced noise reduction",
            "Removable cheek pads",
            "Emergency quick release system",
            "Pinlock ready"
        ],
        safetyRating: "ECE",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        isActive: true,
        isFeatured: true,
        tags: ["touring", "premium", "quiet", "comfortable"],
        specifications: {
            shellMaterial: "Advanced Integrated Matrix Plus",
            linerMaterial: "Multi-density EPS",
            visorType: "Clear with sun visor",
            ventilation: "Premium",
            weight: 1650,
            certification: "ECE"
        }
    },
    {
        name: "Bell Qualifier DLX",
        brand: "Bell",
        category: "Full Face",
        size: "S",
        color: "Metallic Red",
        material: "Polycarbonate",
        weight: 1550,
        price: 18000,
        originalPrice: 20000,
        discount: 10,
        stock: 25,
        description: "Affordable full-face helmet with excellent safety features and comfortable fit. Great value for money.",
        features: [
            "Polycarbonate shell",
            "Removable liner",
            "DOT certified",
            "Multiple shell sizes",
            "Comfortable padding"
        ],
        safetyRating: "DOT",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        isActive: true,
        isFeatured: false,
        tags: ["budget", "safety", "comfortable", "value"],
        specifications: {
            shellMaterial: "Polycarbonate",
            linerMaterial: "Multi-density EPS",
            visorType: "Clear",
            ventilation: "Standard",
            weight: 1550,
            certification: "DOT"
        }
    },
    {
        name: "Arai RX-7V",
        brand: "Arai",
        category: "Sport",
        size: "XL",
        color: "Glossy Blue",
        material: "Peripherally Belted Complex Laminate Construction",
        weight: 1400,
        price: 65000,
        originalPrice: 70000,
        discount: 7,
        stock: 5,
        description: "Professional racing helmet with advanced safety technology and aerodynamic design. Used by professional racers worldwide.",
        features: [
            "Peripherally Belted Complex Laminate Construction",
            "Advanced ventilation system",
            "Removable liner system",
            "Emergency quick release",
            "Multiple shell sizes"
        ],
        safetyRating: "SNELL",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        isActive: true,
        isFeatured: true,
        tags: ["racing", "professional", "premium", "aerodynamic"],
        specifications: {
            shellMaterial: "Peripherally Belted Complex Laminate Construction",
            linerMaterial: "Multi-density EPS",
            visorType: "Clear",
            ventilation: "Advanced",
            weight: 1400,
            certification: "SNELL"
        }
    },
    {
        name: "HJC RPHA 11 Pro",
        brand: "HJC",
        category: "Sport",
        size: "M",
        color: "Matte Carbon",
        material: "Advanced P.I.M. Plus",
        weight: 1350,
        price: 35000,
        originalPrice: 38000,
        discount: 8,
        stock: 12,
        description: "Lightweight sport helmet with advanced aerodynamics and excellent ventilation. Perfect for track days and spirited riding.",
        features: [
            "Advanced P.I.M. Plus shell",
            "Aerodynamic design",
            "Advanced ventilation",
            "Removable liner",
            "Pinlock ready"
        ],
        safetyRating: "ECE",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        isActive: true,
        isFeatured: false,
        tags: ["sport", "lightweight", "aerodynamic", "track"],
        specifications: {
            shellMaterial: "Advanced P.I.M. Plus",
            linerMaterial: "Multi-density EPS",
            visorType: "Clear",
            ventilation: "Advanced",
            weight: 1350,
            certification: "ECE"
        }
    }
];

const seedHelmets = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing helmets
        await Helmet.deleteMany({});
        console.log('Cleared existing helmets');

        // Insert sample helmets
        const insertedHelmets = await Helmet.insertMany(sampleHelmets);
        console.log(`Inserted ${insertedHelmets.length} helmets`);

        console.log('Helmet seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding helmets:', error);
        process.exit(1);
    }
};

seedHelmets(); 