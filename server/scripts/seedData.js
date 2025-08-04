const { sequelize, User, Product, Project, BlogPost, Contact, Category, Tag } = require('../models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('📦 PostgreSQL Connected for seeding');
    
    // Sync database
    await sequelize.sync({ force: false, alter: true });
    console.log('📦 Database synchronized');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedCategories = async () => {
  const categories = [
    {
      name: 'Living Room',
      description: 'Comfortable and stylish furniture for your living space',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    },
    {
      name: 'Dining Room',
      description: 'Elegant dining furniture for memorable meals',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg'
    },
    {
      name: 'Bedroom',
      description: 'Peaceful and comfortable bedroom furniture',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'
    },
    {
      name: 'Office',
      description: 'Professional and ergonomic office furniture',
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg'
    },
    {
      name: 'Kitchen',
      description: 'Functional and beautiful kitchen furniture',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    },
    {
      name: 'Outdoor',
      description: 'Weather-resistant outdoor furniture',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg'
    }
  ];

  await Category.destroy({ where: {} });
  const createdCategories = await Category.bulkCreate(categories);
  console.log('✅ Categories seeded');
  return createdCategories;
};

const seedTags = async () => {
  const tags = [
    { name: 'sustainable', color: '#10B981' },
    { name: 'handcrafted', color: '#F59E0B' },
    { name: 'modern', color: '#3B82F6' },
    { name: 'traditional', color: '#8B5CF6' },
    { name: 'luxury', color: '#EF4444' },
    { name: 'eco-friendly', color: '#059669' },
    { name: 'custom', color: '#DC2626' },
    { name: 'ergonomic', color: '#7C3AED' },
    { name: 'minimalist', color: '#6B7280' },
    { name: 'vintage', color: '#92400E' }
  ];

  await Tag.destroy({ where: {} });
  const createdTags = await Tag.bulkCreate(tags);
  console.log('✅ Tags seeded');
  return createdTags;
};

const seedProducts = async (categories, tags) => {
  const livingRoomCategory = categories.find(c => c.name === 'Living Room');
  const diningRoomCategory = categories.find(c => c.name === 'Dining Room');
  const officeCategory = categories.find(c => c.name === 'Office');
  const bedroomCategory = categories.find(c => c.name === 'Bedroom');

  const products = [
    {
      name: 'Modern Oak Dining Table',
      description: 'Handcrafted from sustainable oak wood with a natural finish. Perfect for family gatherings and dinner parties. Features solid construction and timeless design.',
      price: 1299.99,
      comparePrice: 1599.99,
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      images: [
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
      ],
      categoryId: diningRoomCategory.id,
      material: 'Oak Wood',
      inStock: true,
      stockQuantity: 15,
      dimensions: { length: 180, width: 90, height: 75, unit: 'cm' },
      weight: { value: 45, unit: 'kg' },
      features: ['Sustainable materials', 'Handcrafted', 'Natural finish', 'Seats 6-8 people'],
      specifications: {
        'Assembly Required': 'Yes',
        'Warranty': '5 years',
        'Care Instructions': 'Dust regularly, use coasters'
      },
      rating: 4.8,
      reviewCount: 24,
      featured: true,
      customizable: true,
      leadTime: '4-6 weeks'
    },
    {
      name: 'Luxury Leather Sofa',
      description: 'Premium Italian leather with solid hardwood frame. Comfort meets elegance in this stunning three-seater sofa. Perfect centerpiece for any living room.',
      price: 2499.99,
      comparePrice: 2999.99,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg'
      ],
      categoryId: livingRoomCategory.id,
      material: 'Italian Leather & Hardwood',
      inStock: true,
      stockQuantity: 8,
      dimensions: { length: 220, width: 95, height: 85, unit: 'cm' },
      weight: { value: 75, unit: 'kg' },
      features: ['Italian leather', 'Hardwood frame', 'Comfortable cushions', 'Seats 3 people'],
      specifications: {
        'Leather Type': 'Top Grain Italian',
        'Frame Material': 'Solid Hardwood',
        'Cushion Fill': 'High-density foam',
        'Warranty': '5 years frame, 2 years leather'
      },
      rating: 4.9,
      reviewCount: 18,
      featured: true,
      customizable: true,
      leadTime: '6-8 weeks'
    },
    {
      name: 'Ergonomic Office Chair',
      description: 'Modern design with lumbar support and adjustable height. Perfect for long working hours with breathable mesh back and comfortable padding.',
      price: 599.99,
      comparePrice: 799.99,
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
      categoryId: officeCategory.id,
      material: 'Mesh & Steel',
      inStock: false,
      stockQuantity: 0,
      dimensions: { length: 65, width: 65, height: 120, unit: 'cm' },
      weight: { value: 18, unit: 'kg' },
      features: ['Ergonomic design', 'Lumbar support', 'Adjustable height', 'Breathable mesh'],
      specifications: {
        'Adjustability': 'Height, armrests, tilt',
        'Weight Capacity': '150 kg',
        'Warranty': '3 years',
        'Certification': 'GREENGUARD Gold'
      },
      rating: 4.6,
      reviewCount: 32,
      featured: false,
      customizable: false,
      leadTime: '2-3 weeks'
    },
    {
      name: 'Rustic Wooden Bed Frame',
      description: 'Solid wood bed frame with rustic charm. Handcrafted from reclaimed wood with natural imperfections that add character.',
      price: 899.99,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      categoryId: bedroomCategory.id,
      material: 'Reclaimed Wood',
      inStock: true,
      stockQuantity: 12,
      dimensions: { length: 200, width: 160, height: 100, unit: 'cm' },
      weight: { value: 55, unit: 'kg' },
      features: ['Reclaimed wood', 'Rustic design', 'Solid construction', 'Queen size'],
      specifications: {
        'Bed Size': 'Queen (160x200cm)',
        'Headboard Height': '100cm',
        'Slat Support': 'Included',
        'Assembly': 'Required'
      },
      rating: 4.7,
      reviewCount: 15,
      featured: false,
      customizable: true,
      leadTime: '3-4 weeks'
    }
  ];

  await Product.destroy({ where: {} });
  const createdProducts = await Product.bulkCreate(products);
  
  // Associate products with tags
  for (let i = 0; i < createdProducts.length; i++) {
    const product = createdProducts[i];
    const productTags = tags.slice(i * 2, (i * 2) + 3); // Assign 3 tags per product
    await product.setTags(productTags);
  }

  console.log('✅ Products seeded');
  return createdProducts;
};

const seedProjects = async (categories, tags) => {
  const livingRoomCategory = categories.find(c => c.name === 'Living Room');
  const officeCategory = categories.find(c => c.name === 'Office');

  const projects = [
    {
      title: 'Modern Living Room Makeover',
      description: 'Complete transformation of a traditional living space into a modern, minimalist haven with custom furniture pieces and thoughtful design elements.',
      beforeImage: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
      afterImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      images: [
        { url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', caption: 'Final result', type: 'after' },
        { url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg', caption: 'Detail view', type: 'detail' }
      ],
      cost: 15000.00,
      materials: 'Italian Leather, Oak Wood, Steel, Glass',
      duration: '6 weeks',
      categoryId: livingRoomCategory.id,
      client: { 
        name: 'Johnson Family', 
        location: 'San Francisco, CA', 
        type: 'residential' 
      },
      testimonial: {
        text: 'Amazing transformation! The team exceeded our expectations and delivered exactly what we envisioned. The quality is outstanding.',
        author: 'Sarah Johnson',
        rating: 5,
        date: new Date()
      },
      challenges: 'Working with limited space while maximizing functionality and maintaining the home\'s architectural character.',
      solutions: 'Custom-built modular furniture that serves multiple purposes, smart storage solutions, and careful color coordination.',
      techniques: ['Custom joinery', 'Space optimization', 'Color coordination', 'Modular design'],
      timeline: [
        { phase: 'Planning & Design', duration: '1 week', description: 'Initial consultation and design development', completed: true },
        { phase: 'Material Selection', duration: '3 days', description: 'Sourcing premium materials', completed: true },
        { phase: 'Manufacturing', duration: '4 weeks', description: 'Handcrafting furniture pieces', completed: true },
        { phase: 'Installation', duration: '2 days', description: 'Professional delivery and setup', completed: true }
      ],
      featured: true,
      status: 'completed',
      completedAt: new Date('2024-01-15'),
      views: 245,
      likes: 18
    },
    {
      title: 'Executive Office Redesign',
      description: 'Professional office space designed for productivity and style with custom-built furniture and storage solutions for a growing tech startup.',
      beforeImage: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
      afterImage: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
      images: [
        { url: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg', caption: 'Completed office', type: 'after' }
      ],
      cost: 8500.00,
      materials: 'Walnut Wood, Leather, Glass, Steel',
      duration: '4 weeks',
      categoryId: officeCategory.id,
      client: { 
        name: 'Tech Startup Inc.', 
        location: 'Austin, TX', 
        type: 'commercial' 
      },
      testimonial: {
        text: 'The new office design has significantly improved our team\'s productivity and morale. Professional and beautiful work.',
        author: 'Mike Chen',
        rating: 5,
        date: new Date()
      },
      challenges: 'Creating a professional yet comfortable workspace that reflects the company\'s innovative culture.',
      solutions: 'Ergonomic furniture with modern aesthetics, integrated technology solutions, and flexible workspace design.',
      techniques: ['Ergonomic design', 'Cable management', 'Modular systems', 'Technology integration'],
      timeline: [
        { phase: 'Consultation', duration: '3 days', description: 'Understanding business needs', completed: true },
        { phase: 'Design', duration: '1 week', description: 'Creating workspace layout', completed: true },
        { phase: 'Manufacturing', duration: '2.5 weeks', description: 'Building custom pieces', completed: true },
        { phase: 'Installation', duration: '2 days', description: 'Setup and configuration', completed: true }
      ],
      featured: false,
      status: 'completed',
      completedAt: new Date('2024-01-10'),
      views: 156,
      likes: 12
    }
  ];

  await Project.destroy({ where: {} });
  const createdProjects = await Project.bulkCreate(projects);
  
  // Associate projects with tags
  for (let i = 0; i < createdProjects.length; i++) {
    const project = createdProjects[i];
    const projectTags = tags.slice(i * 2, (i * 2) + 2); // Assign 2 tags per project
    await project.setTags(projectTags);
  }

  console.log('✅ Projects seeded');
  return createdProjects;
};

const seedBlogPosts = async (categories, tags, users) => {
  const author = users.find(u => u.role === 'admin') || users[0];

  const blogPosts = [
    {
      title: 'Sustainable Furniture: A Guide to Eco-Friendly Choices',
      content: `# Sustainable Furniture: A Guide to Eco-Friendly Choices

In today's world, making sustainable choices has become more important than ever. When it comes to furniture, these decisions can have a lasting impact on both your home and the environment. This comprehensive guide will help you navigate the world of eco-friendly furniture options.

## Understanding Sustainable Materials

Sustainable furniture begins with the materials used in its construction. Look for pieces made from:

### Reclaimed Wood
Reclaimed wood gives new life to old materials, reducing the need for new timber harvesting. Each piece tells a story and adds unique character to your home.

### Bamboo
Bamboo is one of the fastest-growing plants on Earth, making it an excellent renewable resource. It's also naturally antimicrobial and incredibly strong.

### FSC-Certified Lumber
The Forest Stewardship Council (FSC) certification ensures that wood products come from responsibly managed forests that provide environmental, social, and economic benefits.

## Quality Over Quantity

Investing in high-quality furniture pieces that will last for decades is one of the most sustainable choices you can make. Well-crafted furniture not only reduces waste but also provides better value over time.

## Local Craftsmanship

Supporting local artisans and furniture makers reduces transportation emissions and helps strengthen your community's economy. Local craftspeople often use traditional techniques that result in more durable, unique pieces.

## Care and Maintenance

Proper care extends the life of your furniture significantly:
- Regular cleaning with appropriate products
- Protecting from direct sunlight and moisture
- Professional maintenance when needed
- Timely repairs to prevent further damage

Making sustainable furniture choices is an investment in both your home and the planet's future.`,
      excerpt: 'Discover how to make environmentally conscious furniture choices that benefit both your home and the planet. Learn about sustainable materials, quality craftsmanship, and care tips.',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      authorId: author.id,
      categoryId: categories.find(c => c.name === 'Living Room').id,
      status: 'published',
      featured: true,
      views: 1250,
      likes: 89,
      readTime: 5,
      publishedAt: new Date('2024-01-15'),
      seo: {
        metaTitle: 'Sustainable Furniture Guide - Eco-Friendly Choices | FurniCraft',
        metaDescription: 'Learn how to choose sustainable, eco-friendly furniture that benefits your home and the environment.',
        keywords: ['sustainable furniture', 'eco-friendly', 'green living', 'environmental']
      },
      comments: [
        {
          id: '1',
          author: 'Jane Smith',
          email: 'jane@example.com',
          content: 'Great article! Very informative about sustainable options.',
          approved: true,
          date: new Date('2024-01-16')
        }
      ]
    },
    {
      title: 'The Art of Mixing Modern and Traditional Styles',
      content: `# The Art of Mixing Modern and Traditional Styles

Creating harmony between contemporary and classic furniture pieces is an art form that can transform any space into a unique, personalized environment. This guide will help you master the balance between old and new.

## Finding the Right Balance

The key to successfully mixing styles lies in finding the right balance. A good rule of thumb is to use a dominant style (60-70%) and accent with pieces from other styles (30-40%).

## Color Coordination

Use a consistent color palette to tie different styles together. Neutral colors work particularly well as a foundation, allowing you to add pops of color through accessories and accent pieces.

## Scale and Proportion

Ensure that pieces work well together in terms of scale. A massive traditional armoire might overwhelm a delicate modern coffee table, so consider proportions carefully when planning your space.

## Texture and Materials

Mix different textures and materials to add visual interest and depth to your space:
- Combine smooth modern surfaces with rough traditional textures
- Mix metals like brass and steel
- Pair natural materials with synthetic ones

## Creating Focal Points

Use statement pieces from either style to create focal points in your room. This could be a modern art piece in a traditional setting or an antique in a contemporary space.

## Practical Tips

1. Start with larger pieces and build around them
2. Use lighting to unify different styles
3. Add plants to soften hard lines
4. Layer textiles for warmth and comfort

Remember, the goal is to create a space that feels cohesive and reflects your personal style.`,
      excerpt: 'Master the art of blending different design aesthetics to create a cohesive and stylish home. Tips for balancing modern and traditional elements.',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      authorId: author.id,
      categoryId: categories.find(c => c.name === 'Living Room').id,
      status: 'published',
      featured: false,
      views: 890,
      likes: 67,
      readTime: 4,
      publishedAt: new Date('2024-01-10'),
      seo: {
        metaTitle: 'Mixing Modern and Traditional Furniture Styles | FurniCraft',
        metaDescription: 'Learn how to successfully blend modern and traditional furniture styles for a unique, personalized home.',
        keywords: ['interior design', 'furniture styling', 'modern traditional', 'home decor']
      }
    }
  ];

  await BlogPost.destroy({ where: {} });
  const createdPosts = await BlogPost.bulkCreate(blogPosts);
  
  // Associate blog posts with tags
  for (let i = 0; i < createdPosts.length; i++) {
    const post = createdPosts[i];
    const postTags = tags.slice(i * 3, (i * 3) + 4); // Assign 4 tags per post
    await post.setTags(postTags);
  }

  console.log('✅ Blog posts seeded');
  return createdPosts;
};

const seedUsers = async () => {
  const users = [
    {
      username: 'admin',
      email: 'admin@furnicraft.com',
      password: 'furnicraft2024',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1-555-000-0000',
      role: 'admin',
      status: 'active',
      emailVerified: true,
      lastLogin: new Date()
    },
    {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1-555-123-4567',
      role: 'customer',
      status: 'active',
      emailVerified: true,
      preferences: {
        newsletter: true,
        notifications: true,
        theme: 'light'
      }
    },
    {
      username: 'janesmith',
      email: 'jane@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1-555-987-6543',
      role: 'staff',
      status: 'active',
      emailVerified: true,
      lastLogin: new Date('2024-01-19')
    },
    {
      username: 'designer1',
      email: 'sarah@furnicraft.com',
      password: 'designer123',
      firstName: 'Sarah',
      lastName: 'Mitchell',
      phone: '+1-555-111-2222',
      role: 'staff',
      status: 'active',
      emailVerified: true
    }
  ];

  await User.destroy({ where: {} });
  const createdUsers = await User.bulkCreate(users);
  console.log('✅ Users seeded');
  return createdUsers;
};

const seedContacts = async () => {
  const contacts = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1-555-444-5555',
      subject: 'custom-order',
      message: 'I\'m interested in a custom dining table for 8 people. Can you provide a quote?',
      preferredContact: 'email',
      urgency: 'medium',
      status: 'new'
    },
    {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1-555-666-7777',
      subject: 'quote-request',
      message: 'Looking for a complete living room set. Modern style preferred.',
      preferredContact: 'phone',
      urgency: 'high',
      status: 'in-progress'
    }
  ];

  await Contact.destroy({ where: {} });
  await Contact.bulkCreate(contacts);
  console.log('✅ Contacts seeded');
};

const seedAll = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    console.log('🌱 ================================');
    
    const categories = await seedCategories();
    const tags = await seedTags();
    const users = await seedUsers();
    const products = await seedProducts(categories, tags);
    const projects = await seedProjects(categories, tags);
    const blogPosts = await seedBlogPosts(categories, tags, users);
    await seedContacts();
    
    console.log('🌱 ================================');
    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Created ${categories.length} categories`);
    console.log(`🏷️  Created ${tags.length} tags`);
    console.log(`👥 Created ${users.length} users`);
    console.log(`📦 Created ${products.length} products`);
    console.log(`🏗️  Created ${projects.length} projects`);
    console.log(`📝 Created ${blogPosts.length} blog posts`);
    console.log('🌱 ================================');
    
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

module.exports = { 
  seedAll, 
  seedCategories, 
  seedTags, 
  seedUsers, 
  seedProducts, 
  seedProjects, 
  seedBlogPosts, 
  seedContacts 
};