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
  User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
  User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
  User.hasMany(BlogPost, { foreignKey: 'authorId', as: 'blogPosts' });

  // Product associations
  Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
  Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
  Product.belongsToMany(Tag, { through: 'ProductTags', as: 'tags' });

  // Project associations
  Project.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Project.belongsToMany(Tag, { through: 'ProjectTags', as: 'tags' });

  // Blog associations
  BlogPost.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
  BlogPost.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  BlogPost.belongsToMany(Tag, { through: 'BlogTags', as: 'tags' });

  // Review associations
  Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

  // Order associations
  Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });

  // OrderItem associations
  OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

  // Category associations
  Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
  Category.hasMany(Project, { foreignKey: 'categoryId', as: 'projects' });
  Category.hasMany(BlogPost, { foreignKey: 'categoryId', as: 'blogPosts' });

  // Tag associations
  Tag.belongsToMany(Product, { through: 'ProductTags', as: 'products' });
  Tag.belongsToMany(Project, { through: 'ProjectTags', as: 'projects' });
  Tag.belongsToMany(BlogPost, { through: 'BlogTags', as: 'blogPosts' });
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