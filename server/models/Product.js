module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 200]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    comparePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    material: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    dimensions: {
      type: DataTypes.JSONB,
      defaultValue: {
        length: null,
        width: null,
        height: null,
        unit: 'cm'
      }
    },
    weight: {
      type: DataTypes.JSONB,
      defaultValue: {
        value: null,
        unit: 'kg'
      }
    },
    features: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    specifications: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'draft', 'archived'),
      defaultValue: 'active'
    },
    seo: {
      type: DataTypes.JSONB,
      defaultValue: {
        metaTitle: null,
        metaDescription: null,
        keywords: []
      }
    },
    customizable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    leadTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'products',
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['categoryId'] },
      { fields: ['price'] },
      { fields: ['inStock'] },
      { fields: ['featured'] },
      { fields: ['status'] },
      { fields: ['rating'] },
      {
        name: 'products_search_idx',
        fields: ['name', 'description'],
        using: 'gin',
        operator: 'gin_trgm_ops'
      }
    ]
  });

  // Instance methods
  Product.prototype.updateRating = async function() {
    const reviews = await this.getReviews();
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const avgRating = totalRating / reviews.length;
      
      await this.update({
        rating: avgRating,
        reviewCount: reviews.length
      });
    }
  };

  Product.prototype.incrementViews = async function() {
    await this.increment('views');
  };

  return Product;
};