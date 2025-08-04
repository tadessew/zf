const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Import all models
const User = require('./User')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const Project = require('./Project')(sequelize, DataTypes);
const BlogPost = require('./BlogPost')(sequelize, DataTypes);
const Contact = require('./Contact')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Tag = require('./Tag')(sequelize, DataTypes);
const Review = require('./Review')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);

// Define associations
const defineAssociations = () => {
  // User associations
  User.hasMany(Review, { foreignKey: 'userId', as: 'reviews', onDelete: 'SET NULL' });
  User.hasMany(Order, { foreignKey: 'userId', as: 'orders', onDelete: 'SET NULL' });
  User.hasMany(BlogPost, { foreignKey: 'authorId', as: 'blogPosts', onDelete: 'SET NULL' });
  User.hasMany(Contact, { foreignKey: 'assignedTo', as: 'assignedContacts', onDelete: 'SET NULL' });

  // Product associations
  Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category', onDelete: 'SET NULL' });
  Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews', onDelete: 'CASCADE' });
  Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems', onDelete: 'CASCADE' });
  Product.belongsToMany(Tag, { 
    through: 'ProductTags', 
    as: 'tags',
    foreignKey: 'productId',
    otherKey: 'tagId'
  });

  // Project associations
  Project.belongsTo(Category, { foreignKey: 'categoryId', as: 'category', onDelete: 'SET NULL' });
  Project.belongsToMany(Tag, { 
    through: 'ProjectTags', 
    as: 'tags',
    foreignKey: 'projectId',
    otherKey: 'tagId'
  });

  // Blog associations
  BlogPost.belongsTo(User, { foreignKey: 'authorId', as: 'author', onDelete: 'SET NULL' });
  BlogPost.belongsTo(Category, { foreignKey: 'categoryId', as: 'category', onDelete: 'SET NULL' });
  BlogPost.belongsToMany(Tag, { 
    through: 'BlogTags', 
    as: 'tags',
    foreignKey: 'blogPostId',
    otherKey: 'tagId'
  });

  // Review associations
  Review.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'SET NULL' });
  Review.belongsTo(Product, { foreignKey: 'productId', as: 'product', onDelete: 'CASCADE' });
  Review.belongsTo(User, { foreignKey: 'moderatedBy', as: 'moderator', onDelete: 'SET NULL' });

  // Order associations
  Order.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'SET NULL' });
  Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });

  // OrderItem associations
  OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order', onDelete: 'CASCADE' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product', onDelete: 'CASCADE' });

  // Contact associations
  Contact.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee', onDelete: 'SET NULL' });

  // Category associations
  Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products', onDelete: 'SET NULL' });
  Category.hasMany(Project, { foreignKey: 'categoryId', as: 'projects', onDelete: 'SET NULL' });
  Category.hasMany(BlogPost, { foreignKey: 'categoryId', as: 'blogPosts', onDelete: 'SET NULL' });
  
  // Self-referencing for parent/child categories
  Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId', onDelete: 'SET NULL' });
  Category.hasMany(Category, { as: 'children', foreignKey: 'parentId', onDelete: 'SET NULL' });

  // Tag associations
  Tag.belongsToMany(Product, { 
    through: 'ProductTags', 
    as: 'products',
    foreignKey: 'tagId',
    otherKey: 'productId'
  });
  Tag.belongsToMany(Project, { 
    through: 'ProjectTags', 
    as: 'projects',
    foreignKey: 'tagId',
    otherKey: 'projectId'
  });
  Tag.belongsToMany(BlogPost, { 
    through: 'BlogTags', 
    as: 'blogPosts',
    foreignKey: 'tagId',
    otherKey: 'blogPostId'
  });
};

defineAssociations();

module.exports = {
  sequelize,
  User,
  Product,
  Project,
  BlogPost,
  Contact,
  Category,
  Tag,
  Review,
  Order,
  OrderItem
};