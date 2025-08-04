const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');
const adminRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');
const reviewRoutes = require('./routes/reviews');
const orderRoutes = require('./routes/orders');

const app = express();

// Create necessary directories
const createDirectories = () => {
  const dirs = ['uploads', 'uploads/products', 'uploads/projects', 'uploads/blog', 'uploads/general', 'logs'];
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
};

createDirectories();

// Connect to PostgreSQL
connectDB();

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'", "https:"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      fontSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'", "https:", "http:"],
      mediaSrc: ["'self'", "https:", "http:"],
      objectSrc: ["'none'"],
      frameSrc: ["'self'", "https:"]
    },
  },
}));

app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil((process.env.RATE_LIMIT_WINDOW || 15) * 60)
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks and static files
    return req.path === '/api/health' || req.path.startsWith('/uploads/');
  }
});

// Speed limiter for repeated requests
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per windowMs without delay
  delayMs: 500, // add 500ms delay per request after delayAfter
  maxDelayMs: 20000, // max delay of 20 seconds
});

app.use('/api/', limiter);
app.use('/api/', speedLimiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [process.env.FRONTEND_URL || 'http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count']
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
  }));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Request metadata middleware
app.use((req, res, next) => {
  req.clientIP = req.ip || req.connection.remoteAddress;
  req.userAgent = req.get('User-Agent');
  req.referrer = req.get('Referrer');
  req.timestamp = new Date();
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    database: 'PostgreSQL',
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    nodeVersion: process.version,
    platform: process.platform
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    api: 'FurniCraft Backend API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      projects: '/api/projects',
      blog: '/api/blog',
      contact: '/api/contact',
      admin: '/api/admin',
      upload: '/api/upload'
    },
    documentation: '/api/docs'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'FurniCraft API Documentation',
    version: '1.0.0',
    description: 'Complete REST API for FurniCraft furniture website with PostgreSQL',
    baseUrl: `${req.protocol}://${req.get('host')}/api`,
    authentication: {
      type: 'JWT Bearer Token',
      header: 'Authorization: Bearer <token>',
      adminCredentials: {
        username: 'admin',
        password: 'furnicraft2024'
      }
    },
    endpoints: {
      auth: {
        login: 'POST /auth/login',
        register: 'POST /auth/register',
        logout: 'POST /auth/logout',
        me: 'GET /auth/me',
        refresh: 'POST /auth/refresh'
      },
      products: {
        list: 'GET /products?page=1&limit=10&category=Living Room&search=oak',
        get: 'GET /products/:id',
        create: 'POST /products (Admin)',
        update: 'PUT /products/:id (Admin)',
        delete: 'DELETE /products/:id (Admin)',
        related: 'GET /products/:id/related'
      },
      projects: {
        list: 'GET /projects?page=1&limit=10&category=Living Room',
        get: 'GET /projects/:id',
        create: 'POST /projects (Admin)',
        update: 'PUT /projects/:id (Admin)',
        delete: 'DELETE /projects/:id (Admin)'
      },
      blog: {
        list: 'GET /blog?page=1&limit=10&category=Design Tips',
        get: 'GET /blog/:id',
        create: 'POST /blog (Admin)',
        update: 'PUT /blog/:id (Admin)',
        delete: 'DELETE /blog/:id (Admin)',
        like: 'POST /blog/:id/like'
      },
      contact: {
        submit: 'POST /contact',
        list: 'GET /contact (Admin)',
        get: 'GET /contact/:id (Admin)',
        update: 'PUT /contact/:id (Admin)',
        delete: 'DELETE /contact/:id (Admin)'
      },
      categories: {
        list: 'GET /categories',
        create: 'POST /categories (Admin)',
        update: 'PUT /categories/:id (Admin)',
        delete: 'DELETE /categories/:id (Admin)'
      },
      tags: {
        list: 'GET /tags',
        create: 'POST /tags (Admin)',
        update: 'PUT /tags/:id (Admin)',
        delete: 'DELETE /tags/:id (Admin)'
      },
      reviews: {
        list: 'GET /reviews?productId=uuid',
        create: 'POST /reviews',
        moderate: 'PUT /reviews/:id/moderate (Admin)'
      },
      orders: {
        list: 'GET /orders (Admin)',
        create: 'POST /orders',
        updateStatus: 'PUT /orders/:id/status (Admin)'
      },
      upload: {
        upload: 'POST /upload/:type (Admin)',
        list: 'GET /upload/:type (Admin)',
        delete: 'DELETE /upload/:type/:filename (Admin)'
      },
      admin: {
        dashboard: 'GET /admin/dashboard',
        analytics: 'GET /admin/analytics?period=30d',
        users: 'GET /admin/users',
        systemInfo: 'GET /admin/system-info'
      }
    },
    examples: {
      createProduct: {
        method: 'POST',
        url: '/api/products',
        headers: { 'Authorization': 'Bearer <admin-token>' },
        body: {
          name: 'Modern Oak Table',
          description: 'Beautiful handcrafted table',
          price: 1299,
          image: 'https://example.com/image.jpg',
          categoryId: 'uuid-here',
          material: 'Oak Wood',
          inStock: true,
          stockQuantity: 10
        }
      },
      submitContact: {
        method: 'POST',
        url: '/api/contact',
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1-555-123-4567',
          subject: 'quote-request',
          message: 'I need a quote for custom furniture'
        }
      }
    }
  });
});

// Catch-all for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    availableEndpoints: '/api/docs'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FurniCraft Backend API',
    version: '1.0.0',
    status: 'operational',
    documentation: '/api/docs',
    health: '/api/health'
  });
});

// 404 handler for all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('🚀 ================================');
  console.log(`🚀 FurniCraft Backend Server Started`);
  console.log('🚀 ================================');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Admin Dashboard: ${process.env.FRONTEND_URL}/admin`);
  console.log('🚀 ================================');
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 ${signal} received, shutting down gracefully...`);
  
  server.close(() => {
    console.log('🔌 HTTP server closed');
    
    // Close database connection
    require('./config/database').sequelize.close().then(() => {
      console.log('📦 Database connection closed');
      console.log('✅ Graceful shutdown completed');
      process.exit(0);
    }).catch((error) => {
      console.error('❌ Error closing database:', error);
      process.exit(1);
    });
  });

  // Force close after 30 seconds
  setTimeout(() => {
    console.error('⚠️  Forced shutdown after 30 seconds');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

module.exports = app;