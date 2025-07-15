# FurniCraft Backend Server

A complete Node.js/Express backend server for the FurniCraft furniture website with MongoDB database, authentication, and admin panel functionality.

## 🚀 Features

- **RESTful API** with full CRUD operations
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with secure session management
- **Admin Panel** with comprehensive management tools
- **File Upload** system for images and documents
- **Email Notifications** for contact forms
- **Rate Limiting** and security middleware
- **Input Validation** and error handling
- **Database Seeding** with sample data

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone and navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/furnicraft
   JWT_SECRET=your-super-secret-jwt-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=furnicraft2024
   EMAIL_HOST=smtp.gmail.com
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@furnicraft.com
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB** (if running locally)

5. **Seed the database** (optional):
   ```bash
   node scripts/seedData.js
   ```

6. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "furnicraft2024"
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
```

### Products Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=10&category=Living Room&search=oak
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin only)
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Modern Oak Table",
  "description": "Beautiful handcrafted table",
  "price": 1299,
  "image": "https://example.com/image.jpg",
  "category": "Dining Room",
  "material": "Oak Wood",
  "inStock": true
}
```

#### Update Product (Admin only)
```http
PUT /api/products/:id
Authorization: Bearer <admin-token>
```

#### Delete Product (Admin only)
```http
DELETE /api/products/:id
Authorization: Bearer <admin-token>
```

### Projects Endpoints

#### Get All Projects
```http
GET /api/projects?page=1&limit=10&category=Living Room
```

#### Get Single Project
```http
GET /api/projects/:id
```

#### Create Project (Admin only)
```http
POST /api/projects
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Modern Living Room",
  "description": "Complete makeover project",
  "beforeImage": "https://example.com/before.jpg",
  "afterImage": "https://example.com/after.jpg",
  "cost": 15000,
  "materials": "Oak Wood, Leather",
  "duration": "6 weeks"
}
```

### Blog Endpoints

#### Get All Blog Posts
```http
GET /api/blog?page=1&limit=10&category=Design Tips
```

#### Get Single Blog Post
```http
GET /api/blog/:id
```

#### Create Blog Post (Admin only)
```http
POST /api/blog
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Furniture Care Tips",
  "content": "Full blog content here...",
  "excerpt": "Learn how to care for your furniture",
  "image": "https://example.com/blog-image.jpg",
  "tags": ["care", "maintenance", "tips"]
}
```

### Contact Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "subject": "quote-request",
  "message": "I need a quote for custom furniture",
  "preferredContact": "email",
  "urgency": "medium"
}
```

#### Get All Contacts (Admin only)
```http
GET /api/contact?page=1&limit=20&status=new
Authorization: Bearer <admin-token>
```

### File Upload Endpoints

#### Upload Files (Admin only)
```http
POST /api/upload/products
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

files: [file1, file2, ...]
```

#### Get Uploaded Files (Admin only)
```http
GET /api/upload/products
Authorization: Bearer <admin-token>
```

### Admin Endpoints

#### Dashboard Statistics
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

#### Analytics Data
```http
GET /api/admin/analytics?period=30d
Authorization: Bearer <admin-token>
```

#### User Management
```http
GET /api/admin/users?page=1&limit=20&role=customer
Authorization: Bearer <admin-token>
```

## 🗄️ Database Models

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  image: String (required),
  images: [String],
  category: String (enum),
  material: String (required),
  inStock: Boolean,
  stockQuantity: Number,
  dimensions: { length, width, height, unit },
  weight: { value, unit },
  features: [String],
  tags: [String],
  rating: { average, count },
  reviews: [{ user, rating, comment, date }],
  isActive: Boolean
}
```

### Project Schema
```javascript
{
  title: String (required),
  description: String (required),
  beforeImage: String (required),
  afterImage: String (required),
  images: [{ url, caption, type }],
  cost: Number (required),
  materials: String (required),
  duration: String (required),
  category: String,
  client: { name, location, type },
  testimonial: { text, author, rating },
  challenges: String,
  solutions: String,
  techniques: [String],
  timeline: [{ phase, duration, description, completed }],
  featured: Boolean,
  status: String (enum),
  isActive: Boolean
}
```

### Blog Post Schema
```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String (required),
  image: String (required),
  author: { name, email, avatar },
  tags: [String],
  category: String (enum),
  status: String (enum),
  featured: Boolean,
  views: Number,
  likes: Number,
  comments: [{ author, email, content, approved, date }],
  seo: { metaTitle, metaDescription, keywords },
  publishedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcryptjs
- **Rate Limiting** to prevent abuse
- **Input Validation** using express-validator
- **CORS Protection** with configurable origins
- **Helmet.js** for security headers
- **Account Lockout** after failed login attempts
- **File Upload Validation** with type and size limits

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── adminAuth.js         # Admin authorization
│   └── errorHandler.js      # Global error handling
├── models/
│   ├── Product.js           # Product schema
│   ├── Project.js           # Project schema
│   ├── BlogPost.js          # Blog post schema
│   ├── Contact.js           # Contact form schema
│   └── User.js              # User schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── products.js          # Product CRUD routes
│   ├── projects.js          # Project CRUD routes
│   ├── blog.js              # Blog CRUD routes
│   ├── contact.js           # Contact form routes
│   ├── upload.js            # File upload routes
│   └── admin.js             # Admin panel routes
├── scripts/
│   └── seedData.js          # Database seeding
├── utils/
│   └── sendEmail.js         # Email utility
├── uploads/                 # File upload directory
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── server.js                # Main server file
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/furnicraft
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-domain.com
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "furnicraft-api"
pm2 startup
pm2 save
```

## 📊 Monitoring

The server includes:
- **Health Check Endpoint**: `GET /api/health`
- **System Information**: `GET /api/admin/system-info`
- **Request Logging** with Morgan
- **Error Tracking** with detailed error responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@furnicraft.com
- Documentation: [API Docs](http://localhost:5000/api/health)
- Issues: GitHub Issues page

---

**Happy Coding! 🎉**