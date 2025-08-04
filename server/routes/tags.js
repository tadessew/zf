const express = require('express');
const { body, validationResult } = require('express-validator');
const { Tag } = require('../models');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/tags
// @desc    Get all tags
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      where: { isActive: true },
      order: [['usageCount', 'DESC'], ['name', 'ASC']]
    });

    res.json({
      success: true,
      data: tags
    });

  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/tags
// @desc    Create new tag
// @access  Private (Admin only)
router.post('/', [auth, adminAuth], [
  body('name').notEmpty().withMessage('Tag name is required'),
  body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Color must be a valid hex color')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const tag = await Tag.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Tag created successfully',
      data: tag
    });

  } catch (error) {
    console.error('Create tag error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Tag with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/tags/:id
// @desc    Update tag
// @access  Private (Admin only)
router.put('/:id', [auth, adminAuth], [
  body('name').optional().notEmpty().withMessage('Tag name cannot be empty'),
  body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Color must be a valid hex color')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    await tag.update(req.body);

    res.json({
      success: true,
      message: 'Tag updated successfully',
      data: tag
    });

  } catch (error) {
    console.error('Update tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/tags/:id
// @desc    Delete tag
// @access  Private (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    await tag.update({ isActive: false });

    res.json({
      success: true,
      message: 'Tag deleted successfully'
    });

  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;