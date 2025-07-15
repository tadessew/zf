const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  beforeImage: {
    type: String,
    required: [true, 'Before image is required']
  },
  afterImage: {
    type: String,
    required: [true, 'After image is required']
  },
  images: [{
    url: String,
    caption: String,
    type: {
      type: String,
      enum: ['before', 'after', 'process', 'detail']
    }
  }],
  cost: {
    type: Number,
    required: [true, 'Project cost is required'],
    min: [0, 'Cost cannot be negative']
  },
  materials: {
    type: String,
    required: [true, 'Materials are required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  category: {
    type: String,
    enum: ['Living Room', 'Bedroom', 'Office', 'Kitchen', 'Outdoor', 'Commercial']
  },
  client: {
    name: String,
    location: String,
    type: {
      type: String,
      enum: ['residential', 'commercial']
    }
  },
  testimonial: {
    text: String,
    author: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  challenges: String,
  solutions: String,
  techniques: [String],
  timeline: [{
    phase: String,
    duration: String,
    description: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'completed'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search and filtering
projectSchema.index({ title: 'text', description: 'text' });
projectSchema.index({ category: 1, featured: 1 });
projectSchema.index({ cost: 1 });

module.exports = mongoose.model('Project', projectSchema);