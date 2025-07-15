const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helmet-shop')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import models
const Order = require('./models/Order');
const User = require('./models/User');
const Helmet = require('./models/Helmet');

async function createTestOrder() {
    try {
        // Find or create a test user
        let user = await User.findOne({ email: 'admin@test.com' });
        if (!user) {
            user = new User({
                name: 'Test Admin',
                email: 'admin@test.com',
                password: 'password123',
                phone: '1234567890',
                role: 'admin'
            });
            await user.save();
            console.log('Created test user');
        }

        // Find or create a test helmet
        let helmet = await Helmet.findOne({ name: 'Test Helmet' });
        if (!helmet) {
            helmet = new Helmet({
                name: 'Test Helmet',
                brand: 'Test Brand',
                category: 'Full Face',
                size: 'M',
                color: 'Black',
                material: 'Polycarbonate',
                weight: 1500,
                price: 2500,
                stock: 10,
                description: 'Test helmet for admin panel',
                safetyRating: 'DOT',
                isActive: true,
                isFeatured: false,
                mainImage: 'https://via.placeholder.com/300x300.png?text=Test+Helmet'
            });
            await helmet.save();
            console.log('Created test helmet');
        }

        // Create a test order
        const order = new Order({
            user: user._id,
            items: [{
                helmet: helmet._id,
                price: 2500,
                quantity: 1,
                size: 'M',
                color: 'Black'
            }],
            shippingAddress: {
                fullName: 'Test Customer',
                address: '123 Test Street',
                city: 'Test City',
                postalCode: '12345',
                country: 'Test Country',
                phone: '1234567890'
            },
            totalAmount: 2500,
            paymentStatus: 'Paid',
            orderStatus: 'Pending',
            notes: 'Test order for admin panel'
        });

        await order.save();
        console.log('Created test order:', order._id);
        console.log('Test order created successfully!');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error creating test order:', error);
        await mongoose.disconnect();
    }
}

createTestOrder(); 