# Helmet Shop Backend

A comprehensive backend API for a helmet ecommerce website built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with user roles
- **Helmet Management**: CRUD operations for helmets with advanced filtering
- **Order Management**: Complete order lifecycle management
- **Payment Integration**: Khalti payment gateway integration
- **Email Notifications**: Order confirmations and updates
- **File Upload**: Cloudinary integration for image uploads
- **Search & Filtering**: Advanced search and filtering capabilities
- **Pagination**: Efficient data pagination for large datasets

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Helmets
- `GET /api/helmets` - Get all helmets with filtering and pagination
- `GET /api/helmets/featured` - Get featured helmets
- `GET /api/helmets/categories` - Get available categories
- `GET /api/helmets/brands` - Get available brands
- `GET /api/helmets/category/:category` - Get helmets by category
- `GET /api/helmets/:id` - Get helmet by ID
- `POST /api/helmets` - Create new helmet (Admin)
- `PUT /api/helmets/:id` - Update helmet (Admin)
- `DELETE /api/helmets/:id` - Delete helmet (Admin)

### Helmet Configurations
- `GET /api/helmet-configs` - Get all helmet configurations
- `GET /api/helmet-configs/helmet/:helmetId` - Get configs by helmet
- `POST /api/helmet-configs` - Create configuration (Admin)
- `PUT /api/helmet-configs/:id` - Update configuration (Admin)
- `DELETE /api/helmet-configs/:id` - Delete configuration (Admin)

### Orders
- `POST /api/orders` - Place new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get order by ID (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/payment-status` - Update payment status (Admin)

### Payments
- `POST /api/payments/create-khalti-payment` - Create Khalti payment
- `POST /api/payments/verify-khalti-payment` - Verify Khalti payment

### File Upload
- `POST /api/upload/image` - Upload image to Cloudinary

## Database Models

### Helmet
- Basic info: name, brand, category, size, color, material
- Pricing: price, originalPrice, discount
- Inventory: stock, isActive, isFeatured
- Safety: safetyRating, specifications
- Media: images, mainImage
- Search: tags, description, features

### HelmetConfig
- Customization options for helmets
- Size, color, visor type, ventilation, padding
- Pricing and availability
- Customization features

### Order
- User and items information
- Shipping address and payment details
- Order and payment status tracking
- Khalti payment integration

### User
- Authentication and profile information
- Role-based access control

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_from_email

# Khalti Payment
KHALTI_PUBLIC_KEY=your_khalti_public_key
KHALTI_SECRET_KEY=your_khalti_secret_key

# Frontend URL
FRONTEND_URL=http://localhost:8080

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Seed the database with sample data:
   ```bash
   npm run seed
   ```

## Usage

### Starting the Server
```bash
# Development
npm run dev

# Production
npm start
```

### Database Seeding
```bash
npm run seed
```

## API Documentation

### Query Parameters for Helmet Filtering

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category
- `brand` - Filter by brand
- `size` - Filter by size
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `safetyRating` - Filter by safety rating
- `search` - Search in name, brand, description, tags
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order: asc/desc (default: desc)

### Example API Calls

```javascript
// Get all helmets with filtering
GET /api/helmets?category=Full Face&brand=AGV&minPrice=20000&maxPrice=50000

// Search helmets
GET /api/helmets?search=racing&sortBy=price&sortOrder=asc

// Get featured helmets
GET /api/helmets/featured

// Get helmets by category
GET /api/helmets/category/Sport
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Rate limiting (can be added)

## Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Payment processing errors
- File upload errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License 