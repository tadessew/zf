module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 300]
      }
    },
    slug: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^[a-z0-9-]+$/
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 500]
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'published'
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    readTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Estimated read time in minutes'
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    seo: {
      type: DataTypes.JSONB,
      defaultValue: {
        metaTitle: null,
        metaDescription: null,
        keywords: [],
        canonicalUrl: null
      }
    },
    comments: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    socialShares: {
      type: DataTypes.JSONB,
      defaultValue: {
        facebook: 0,
        twitter: 0,
        linkedin: 0,
        pinterest: 0
      }
    }
  }, {
    tableName: 'blog_posts',
    timestamps: true,
    indexes: [
      { fields: ['slug'] },
      { fields: ['authorId'] },
      { fields: ['categoryId'] },
      { fields: ['status'] },
      { fields: ['featured'] },
      { fields: ['publishedAt'] },
      {
        name: 'blog_posts_search_idx',
        fields: ['title', 'content', 'excerpt'],
        using: 'gin',
        operator: 'gin_trgm_ops'
      }
    ],
    hooks: {
      beforeCreate: (post) => {
        if (!post.slug && post.title) {
          post.slug = post.title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        }
        if (!post.readTime && post.content) {
          // Estimate read time (average 200 words per minute)
          const wordCount = post.content.split(/\s+/).length;
          post.readTime = Math.ceil(wordCount / 200);
        }
        if (post.status === 'published' && !post.publishedAt) {
          post.publishedAt = new Date();
        }
      },
      beforeUpdate: (post) => {
        if (post.changed('title') && !post.changed('slug')) {
          post.slug = post.title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        }
        if (post.changed('content')) {
          const wordCount = post.content.split(/\s+/).length;
          post.readTime = Math.ceil(wordCount / 200);
        }
        if (post.changed('status') && post.status === 'published' && !post.publishedAt) {
          post.publishedAt = new Date();
        }
      }
    }
  });

  // Instance methods
  BlogPost.prototype.incrementViews = async function() {
    await this.increment('views');
  };

  BlogPost.prototype.incrementLikes = async function() {
    await this.increment('likes');
  };

  BlogPost.prototype.addComment = async function(comment) {
    const comments = [...(this.comments || []), {
      id: Date.now().toString(),
      ...comment,
      createdAt: new Date(),
      approved: false
    }];
    await this.update({ comments });
  };

  return BlogPost;
};