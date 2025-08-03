module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
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
    beforeImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    afterImage: {
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
    cost: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    materials: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    client: {
      type: DataTypes.JSONB,
      defaultValue: {
        name: null,
        location: null,
        type: 'residential'
      }
    },
    testimonial: {
      type: DataTypes.JSONB,
      defaultValue: {
        text: null,
        author: null,
        rating: null,
        date: null
      }
    },
    challenges: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    solutions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    techniques: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    timeline: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('planning', 'in-progress', 'completed', 'on-hold', 'cancelled'),
      defaultValue: 'completed'
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
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
    tableName: 'projects',
    timestamps: true,
    indexes: [
      { fields: ['title'] },
      { fields: ['categoryId'] },
      { fields: ['cost'] },
      { fields: ['featured'] },
      { fields: ['status'] },
      { fields: ['completedAt'] },
      {
        name: 'projects_search_idx',
        fields: ['title', 'description'],
        using: 'gin',
        operator: 'gin_trgm_ops'
      }
    ]
  });

  // Instance methods
  Project.prototype.incrementViews = async function() {
    await this.increment('views');
  };

  Project.prototype.incrementLikes = async function() {
    await this.increment('likes');
  };

  return Project;
};