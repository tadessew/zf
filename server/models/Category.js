module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^[a-z0-9-]+$/
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    seo: {
      type: DataTypes.JSONB,
      defaultValue: {
        metaTitle: null,
        metaDescription: null,
        keywords: []
      }
    }
  }, {
    tableName: 'categories',
    timestamps: true,
    indexes: [
      { fields: ['slug'] },
      { fields: ['parentId'] },
      { fields: ['isActive'] },
      { fields: ['sortOrder'] }
    ],
    hooks: {
      beforeCreate: (category) => {
        if (!category.slug && category.name) {
          category.slug = category.name.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        }
      },
      beforeUpdate: (category) => {
        if (category.changed('name') && !category.changed('slug')) {
          category.slug = category.name.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        }
      }
    }
  });

  // Self-referencing association for parent/child categories
  Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
  Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });

  return Category;
};