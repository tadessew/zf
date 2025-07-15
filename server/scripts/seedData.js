const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Product = require('../models/Product');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  const products = [
    {
      name: 'Modern Oak Dining Table',
      description: 'Handcrafted from sustainable oak wood with a natural finish. Perfect for family gatherings and dinner parties.',
      price: 1299,
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      category: 'Dining Room',
      material: 'Oak Wood',
      inStock: true,
      stockQuantity: 15,
      dimensions: { length: 180, width: 90, height: 75, unit: 'cm' },
      weight: { value: 45, unit: 'kg' },
      features: ['Sustainable materials', 'Handcrafted', 'Natural finish', 'Seats 6-8 people'],
      tags: ['dining', 'oak', 'sustainable', 'handcrafted'],
      rating: { average: 4.8, count: 24 }
    },
    {
      name: 'Luxury Leather Sofa',
      description: 'Premium Italian leather with solid hardwood frame. Comfort meets elegance in this stunning piece.',
      price: 2499,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      category: 'Living Room',
      material: 'Leather & Hardwood',
      inStock: true,
      stockQuantity: 8,
      dimensions: { length: 220, width: 95, height: 85, unit: 'cm' },
      weight: { value: 75, unit: 'kg' },
      features: ['Italian leather', 'Hardwood frame', 'Comfortable cushions', 'Seats 3 people'],
      tags: ['sofa', 'leather', 'luxury', 'living room'],
      rating: { average: 4.9, count: 18 }
    },
    {
      name: 'Ergonomic Office Chair',
      description: 'Modern design with lumbar support and adjustable height. Perfect for long working hours.',
      price: 599,
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
      category: 'Office',
      material: 'Mesh & Steel',
      inStock: false,
      stockQuantity: 0,
      dimensions: { length: 65, width: 65, height: 120, unit: 'cm' },
      weight: { value: 18, unit: 'kg' },
      features: ['Ergonomic design', 'Lumbar support', 'Adjustable height', 'Breathable mesh'],
      tags: ['office', 'chair', 'ergonomic', 'adjustable'],
      rating: { average: 4.6, count: 32 }
    }
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Products seeded');
};

const seedProjects = async () => {
  const projects = [
    {
      title: 'Modern Living Room Makeover',
      description: 'Complete transformation of a traditional living space into a modern, minimalist haven with custom furniture pieces.',
      beforeImage: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
      afterImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      cost: 15000,
      materials: 'Italian Leather, Oak Wood, Steel',
      duration: '6 weeks',
      category: 'Living Room',
      client: { name: 'Johnson Family', location: 'San Francisco', type: 'residential' },
      testimonial: {
        text: 'Amazing transformation! The team exceeded our expectations and delivered exactly what we envisioned.',
        author: 'Sarah Johnson',
        rating: 5
      },
      challenges: 'Working with limited space while maximizing functionality',
      solutions: 'Custom-built modular furniture that serves multiple purposes',
      techniques: ['Custom joinery', 'Space optimization', 'Color coordination'],
      timeline: [
        { phase: 'Planning & Design', duration: '1 week', description: 'Initial consultation and design development', completed: true },
        { phase: 'Material Selection', duration: '3 days', description: 'Sourcing premium materials', completed: true },
        { phase: 'Manufacturing', duration: '4 weeks', description: 'Handcrafting furniture pieces', completed: true },
        { phase: 'Installation', duration: '2 days', description: 'Professional delivery and setup', completed: true }
      ],
      featured: true,
      status: 'completed'
    },
    {
      title: 'Executive Office Redesign',
      description: 'Professional office space designed for productivity and style with custom-built furniture and storage solutions.',
      beforeImage: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
      afterImage: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
      cost: 8500,
      materials: 'Walnut Wood, Leather, Glass',
      duration: '4 weeks',
      category: 'Office',
      client: { name: 'Tech Startup Inc.', location: 'Austin', type: 'commercial' },
      testimonial: {
        text: 'The new office design has significantly improved our team\'s productivity and morale.',
        author: 'Mike Chen',
        rating: 5
      },
      challenges: 'Creating a professional yet comfortable workspace',
      solutions: 'Ergonomic furniture with modern aesthetics',
      techniques: ['Ergonomic design', 'Cable management', 'Modular systems'],
      featured: false,
      status: 'completed'
    }
  ];

  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log('✅ Projects seeded');
};

const seedBlogPosts = async () => {
  const blogPosts = [
    {
      title: 'Sustainable Furniture: A Guide to Eco-Friendly Choices',
      content: `In today's world, making sustainable choices has become more important than ever. When it comes to furniture, these decisions can have a lasting impact on both your home and the environment.

## Understanding Sustainable Materials

Sustainable furniture begins with the materials used in its construction. Look for pieces made from:

- **Reclaimed Wood**: Gives new life to old materials
- **Bamboo**: Fast-growing and renewable
- **FSC-Certified Lumber**: Responsibly sourced wood
- **Recycled Materials**: Reduces waste and environmental impact

## Quality Over Quantity

Investing in high-quality furniture pieces that will last for decades is one of the most sustainable choices you can make. Well-crafted furniture not only reduces waste but also provides better value over time.

## Local Craftsmanship

Supporting local artisans and furniture makers reduces transportation emissions and helps strengthen your community's economy. Local craftspeople often use traditional techniques that result in more durable, unique pieces.

## Care and Maintenance

Proper care extends the life of your furniture significantly. Regular cleaning, appropriate storage, and timely repairs can keep your pieces looking beautiful for generations.`,
      excerpt: 'Discover how to make environmentally conscious furniture choices that benefit both your home and the planet.',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      author: { name: 'FurniCraft Team', email: 'team@furnicraft.com' },
      tags: ['sustainability', 'eco-friendly', 'materials', 'environment'],
      category: 'Sustainability',
      status: 'published',
      featured: true,
      views: 1250,
      likes: 89,
      seo: {
        metaTitle: 'Sustainable Furniture Guide - Eco-Friendly Choices | FurniCraft',
        metaDescription: 'Learn how to choose sustainable, eco-friendly furniture that benefits your home and the environment.',
        keywords: ['sustainable furniture', 'eco-friendly', 'green living', 'environmental']
      }
    },
    {
      title: 'The Art of Mixing Modern and Traditional Styles',
      content: `Creating harmony between contemporary and classic furniture pieces is an art form that can transform any space into a unique, personalized environment.

## Finding Balance

The key to successfully mixing styles lies in finding the right balance. Start with a dominant style (60-70%) and accent with pieces from other styles (30-40%).

## Color Coordination

Use a consistent color palette to tie different styles together. Neutral colors work particularly well as a foundation, allowing you to add pops of color through accessories.

## Scale and Proportion

Ensure that pieces work well together in terms of scale. A massive traditional armoire might overwhelm a delicate modern coffee table, so consider proportions carefully.

## Texture and Materials

Mix different textures and materials to add visual interest. Combine smooth modern surfaces with rough traditional textures for dynamic contrast.`,
      excerpt: 'Tips for blending different design aesthetics to create a cohesive and stylish home.',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      author: { name: 'FurniCraft Team', email: 'team@furnicraft.com' },
      tags: ['design', 'styling', 'modern', 'traditional', 'interior'],
      category: 'Design Tips',
      status: 'published',
      featured: false,
      views: 890,
      likes: 67,
      seo: {
        metaTitle: 'Mixing Modern and Traditional Furniture Styles | FurniCraft',
        metaDescription: 'Learn how to successfully blend modern and traditional furniture styles for a unique, personalized home.',
        keywords: ['interior design', 'furniture styling', 'modern traditional', 'home decor']
      }
    }
  ];

  await BlogPost.deleteMany({});
  await BlogPost.insertMany(blogPosts);
  console.log('✅ Blog posts seeded');
};

const seedUsers = async () => {
  const users = [
    {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1-555-123-4567',
      role: 'customer',
      status: 'active'
    },
    {
      username: 'janesmith',
      email: 'jane@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1-555-987-6543',
      role: 'staff',
      status: 'active'
    }
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log('✅ Users seeded');
};

const seedAll = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    await seedProducts();
    await seedProjects();
    await seedBlogPosts();
    await seedUsers();
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAll();
}

module.exports = { seedAll, seedProducts, seedProjects, seedBlogPosts, seedUsers };