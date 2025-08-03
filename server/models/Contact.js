module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    subject: {
      type: DataTypes.ENUM(
        'custom-order',
        'quote-request',
        'product-inquiry',
        'design-consultation',
        'delivery-inquiry',
        'support',
        'partnership',
        'complaint',
        'feedback',
        'other'
      ),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 5000]
      }
    },
    preferredContact: {
      type: DataTypes.ENUM('email', 'phone', 'whatsapp', 'video-call'),
      defaultValue: 'email'
    },
    urgency: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium'
    },
    status: {
      type: DataTypes.ENUM('new', 'in-progress', 'resolved', 'closed', 'spam'),
      defaultValue: 'new'
    },
    assignedTo: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    followUpDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    source: {
      type: DataTypes.STRING(50),
      defaultValue: 'website'
    },
    ipAddress: {
      type: DataTypes.INET,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    referrer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachments: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    tags: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 10
      }
    }
  }, {
    tableName: 'contacts',
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['status'] },
      { fields: ['urgency'] },
      { fields: ['subject'] },
      { fields: ['assignedTo'] },
      { fields: ['createdAt'] },
      { fields: ['followUpDate'] }
    ],
    hooks: {
      beforeUpdate: (contact) => {
        if (contact.changed('status') && contact.status === 'resolved' && !contact.resolvedAt) {
          contact.resolvedAt = new Date();
        }
      }
    }
  });

  return Contact;
};