# 🪑 FurniCraft Backend Server

A complete, production-ready Node.js/Express backend server for the FurniCraft furniture website with PostgreSQL database, JWT authentication, and comprehensive admin panel functionality.

## 🚀 Features

### 🔐 **Authentication & Security**
- **JWT Authentication** with access and refresh tokens
- **Role-based Authorization** (Admin, Staff, Customer)
- **Account Security** with login attempt limiting and account lockout
- **Password Hashing** using bcryptjs with configurable rounds
- **Session Management** with secure cookies
- **Rate Limiting** and DDoS protection
- **Input Validation** and sanitization
- **CORS Protection** with configurable origins
- **Security Headers** with Helmet.js

### 📊 **Database & Models**
- **PostgreSQL** with Sequelize ORM
- **Complete Data Models** for all entities
- **Database Relationships** with proper foreign keys
- **Data Validation** at model level
- **Soft Deletes** for data preservation
- **Database Migrations** and seeding
- **Full-text Search** capabilities
- **Optimized Indexes** for performance

### 🛠️ **API Endpoints**

#### **Authentication**
- `POST /api/auth/login` - User/admin login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Secure logout
- `POST /api/auth/refresh` - Refresh access token

#### **Products Management**
- `GET /api/products` - List with advanced filtering, pagination, search
- `GET /api/products/:id` - Single product with reviews and related items
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Soft delete product (Admin only)
- `GET /api/products/:id/related` - Get related products

#### **Projects Portfolio**
- `GET /api/projects` - List with filtering and pagination
- `GET /api/projects/:id` - Single project with full details
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Soft delete project (Admin only)

#### **Blog Management**
- `GET /api/blog` - List with filtering, search, and pagination
- `GET /api/blog/:id` - Single post with view tracking
- `POST /api/blog` - Create post (Admin only)
- `PUT /api/blog/:id` - Update post (Admin only)
- `DELETE /api/blog/:id` - Delete post (Admin only)
- `POST /api/blog/:id/like` - Like blog post

#### **Contact System**
- `POST /api/contact` - Submit contact form with email notifications
- `GET /api/contact` - List submissions with filtering (Admin only)
- `GET /api/contact/:id` - Get single submission (Admin only)
- `PUT /api/contact/:id` - Update submission status (Admin only)
- `DELETE /api/contact/:id` - Delete submission (Admin only)

#### **Categories & Tags**
- `GET /api/categories` - List all categories with hierarchy
- `POST /api/categories` - Create category (Admin only)
- `GET /api/tags` - List all tags
- `POST /api/tags` - Create tag (Admin only)

#### **Reviews System**
- `GET /api/reviews` - List reviews with filtering
- `POST /api/reviews` - Submit product review
- `PUT /api/reviews/:id/moderate` - Approve/reject review (Admin only)

#### **Order Management**
- `GET /api/orders` - List orders with filtering (Admin only)
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (Admin only)

#### **File Upload**
- `POST /api/upload/:type` - Upload files with validation (Admin only)
- `GET /api/upload/:type` - List uploaded files (Admin only)
- `DELETE /api/upload/:type/:filename` - Delete file (Admin only)

#### **Admin Dashboard**
- `GET /api/admin/dashboard` - Statistics and recent activity
- `GET /api/admin/analytics` - Detailed analytics with date ranges
- `GET /api/admin/users` - User management with filtering
- `PUT /api/admin/users/:id/status` - Update user status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/system-info` - System information and health

### 📧 **Email System**
- **Automated Notifications** for contact forms
- **User Confirmation** emails
- **Admin Alerts** for new submissions
- **Configurable SMTP** settings
- **Email Templates** with HTML support

### 📁 **File Management**
- **Secure Upload System** with type and size validation
- **Image Processing** with Sharp for optimization
- **Organized Storage** by category (products, projects, blog, general)
- **File Metadata** tracking
- **Automatic Cleanup** for unused files

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1. **Clone and Setup**
```bash
cd server
npm install
```

### 2. **Database Setup**
```bash
# Create PostgreSQL database
createdb furnicraft

# Or using psql
psql -U postgres
CREATE DATABASE furnicraft;
\q
```

### 3. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/furnicraft

# JWT Secrets (generate strong secrets)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
JWT_REFRESH_SECRET=your-refresh-token-secret-here-also-make-it-very-long

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=furnicraft2024
ADMIN_EMAIL=admin@furnicraft.com

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@furnicraft.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. **Database Migration & Seeding**
```bash
# Sync database schema
npm run dev  # This will auto-sync in development

# Seed with sample data
node scripts/seedData.js
```

### 5. **Start the Server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 🗄️ Database Schema

### **Core Models**

#### **Users**
```sql
- id (UUID, Primary Key)
- username (String, Unique)
- email (String, Unique)
- password (String, Hashed)
- firstName, lastName (String)
- phone (String)
- role (Enum: admin, staff, customer)
- status (Enum: active, inactive, suspended)
- preferences (JSONB)
- lastLogin (Date)
- loginAttempts (Integer)
- lockUntil (Date)
```

#### **Products**
```sql
- id (UUID, Primary Key)
- name (String)
- description (Text)
- price, comparePrice (Decimal)
- image, images (Text, JSONB)
- categoryId (UUID, Foreign Key)
- material (String)
- inStock (Boolean)
- stockQuantity (Integer)
- dimensions, weight (JSONB)
- features, specifications (JSONB)
- rating (Decimal)
- reviewCount, views (Integer)
- featured, customizable (Boolean)
- status (Enum)
- seo (JSONB)
```

#### **Projects**
```sql
- id (UUID, Primary Key)
- title (String)
- description (Text)
- beforeImage, afterImage (Text)
- images (JSONB)
- cost (Decimal)
- materials, duration (String)
- categoryId (UUID, Foreign Key)
- client, testimonial (JSONB)
- challenges, solutions (Text)
- techniques, timeline (JSONB)
- featured (Boolean)
- status (Enum)
- completedAt (Date)
- views, likes (Integer)
```

#### **Blog Posts**
```sql
- id (UUID, Primary Key)
- title, slug (String)
- content, excerpt (Text)
- image (Text)
- authorId, categoryId (UUID, Foreign Keys)
- status (Enum: draft, published, archived)
- featured (Boolean)
- views, likes (Integer)
- readTime (Integer)
- publishedAt (Date)
- seo, comments (JSONB)
```

#### **Orders**
```sql
- id (UUID, Primary Key)
- orderNumber (String, Unique)
- userId (UUID, Foreign Key)
- customerInfo, shippingAddress (JSONB)
- subtotal, tax, shipping, total (Decimal)
- status (Enum)
- paymentStatus, paymentMethod (String)
- trackingNumber (String)
- deliveredAt (Date)
```

## 🔧 Configuration

### **Environment Variables**

#### **Required**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD` - Admin login password

#### **Optional**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend application URL
- `EMAIL_*` - SMTP email configuration
- `RATE_LIMIT_*` - Rate limiting settings
- `MAX_FILE_SIZE` - File upload size limit

### **Security Configuration**

#### **JWT Settings**
```env
JWT_SECRET=your-256-bit-secret-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-256-bit-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d
```

#### **Rate Limiting**
```env
RATE_LIMIT_WINDOW=15  # minutes
RATE_LIMIT_MAX_REQUESTS=100
```

#### **Account Security**
```env
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
ACCOUNT_LOCKOUT_TIME=7200000  # 2 hours in ms
```

## 🧪 Testing

### **Run Tests**
```bash
npm test
npm run test:watch
```

### **API Testing**
Use tools like Postman, Insomnia, or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"furnicraft2024"}'

# Get products
curl http://localhost:5000/api/products?page=1&limit=5
```

## 🚀 Deployment

### **Environment Setup**
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/furnicraft
JWT_SECRET=production-secret-key
FRONTEND_URL=https://your-domain.com
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### **PM2 Process Manager**
```bash
npm install -g pm2
pm2 start server.js --name "furnicraft-api"
pm2 startup
pm2 save
```

### **Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name api.furnicraft.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Monitoring & Analytics

### **Health Monitoring**
- **Health Check Endpoint**: `/api/health`
- **System Information**: `/api/admin/system-info`
- **Performance Metrics**: Memory, CPU, uptime tracking
- **Database Connection** monitoring

### **Analytics Dashboard**
- **User Analytics**: Registration trends, activity patterns
- **Content Analytics**: Popular products, blog views, project engagement
- **Business Metrics**: Order trends, revenue tracking
- **System Metrics**: API usage, error rates, response times

### **Logging**
- **Request Logging** with Morgan
- **Error Logging** with Winston
- **Access Logs** for production
- **Debug Logs** for development

## 🔒 Security Features

### **Authentication Security**
- ✅ JWT with secure secrets
- ✅ Refresh token rotation
- ✅ Account lockout protection
- ✅ Password strength requirements
- ✅ Secure cookie handling

### **API Security**
- ✅ Rate limiting per IP
- ✅ Request size limits
- ✅ Input validation and sanitization
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection

### **Data Security**
- ✅ Encrypted passwords
- ✅ Secure file uploads
- ✅ Data validation
- ✅ Audit trails
- ✅ Backup strategies

## 📈 Performance Optimization

### **Database Optimization**
- **Indexes** on frequently queried columns
- **Connection Pooling** for efficient database usage
- **Query Optimization** with proper joins and limits
- **Pagination** for large datasets

### **Caching Strategy**
- **Static File Caching** with proper headers
- **API Response Caching** for frequently accessed data
- **Database Query Caching** with Redis (optional)

### **File Handling**
- **Image Optimization** with Sharp
- **File Compression** for uploads
- **CDN Integration** ready
- **Lazy Loading** support

## 🛡️ Admin Dashboard Features

### **Dashboard Overview**
- **Real-time Statistics** for all entities
- **Recent Activity** monitoring
- **Quick Actions** for common tasks
- **System Health** indicators

### **Content Management**
- **Product Management** with full CRUD operations
- **Project Portfolio** management
- **Blog Content** creation and editing
- **Media Library** with file management

### **User Management**
- **User Accounts** with role management
- **Activity Monitoring** and audit logs
- **Permission Management** by role
- **Account Status** control

### **Analytics & Reporting**
- **Traffic Analytics** with detailed metrics
- **Sales Reports** and trends
- **Content Performance** tracking
- **System Usage** statistics

## 🔧 Maintenance

### **Database Maintenance**
```bash
# Backup database
pg_dump furnicraft > backup.sql

# Restore database
psql furnicraft < backup.sql

# Check database size
psql -d furnicraft -c "SELECT pg_size_pretty(pg_database_size('furnicraft'));"
```

### **Log Management**
```bash
# View logs
tail -f logs/access.log
tail -f logs/error.log

# Rotate logs (setup with logrotate)
sudo logrotate /etc/logrotate.d/furnicraft
```

### **Performance Monitoring**
```bash
# Check server status
pm2 status
pm2 monit

# Database performance
psql -d furnicraft -c "SELECT * FROM pg_stat_activity;"
```

## 🤝 API Usage Examples

### **Authentication**
```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'furnicraft2024'
  })
});
const { token, user } = await response.json();
```

### **Products**
```javascript
// Get products with filtering
const products = await fetch('/api/products?category=Living Room&inStock=true&page=1&limit=10');

// Create product (admin only)
const newProduct = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Modern Sofa',
    description: 'Comfortable and stylish',
    price: 1299.99,
    categoryId: 'category-uuid',
    material: 'Leather',
    inStock: true
  })
});
```

### **Contact Form**
```javascript
// Submit contact form
const contact = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'quote-request',
    message: 'I need a quote for custom furniture'
  })
});
```

## 🆘 Troubleshooting

### **Common Issues**

#### **Database Connection**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -h localhost -U postgres -d furnicraft
```

#### **Permission Errors**
```bash
# Fix file permissions
chmod -R 755 uploads/
chown -R node:node uploads/
```

#### **Memory Issues**
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Restart server
pm2 restart furnicraft-api
```

### **Debugging**
```bash
# Enable debug mode
NODE_ENV=development npm run dev

# Check logs
tail -f logs/error.log
pm2 logs furnicraft-api
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@furnicraft.com
- **Documentation**: [API Docs](http://localhost:5000/api/docs)
- **Health Check**: [Server Status](http://localhost:5000/api/health)

---

**🎉 Happy Coding!** Built with ❤️ by the FurniCraft Team