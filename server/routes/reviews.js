const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { Review, Product, User } = require('../models');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews with filtering
// @access  Public
router.get('/', [
  query('productId').optional().isUUID(),
  query('status').optional().isIn(['pending', 'approved', 'rejected']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
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

    const {
      productId,
      status = 'approved',
      page = 1,
      limit = 10
    } = req.query;

    const where = { status };
    if (productId) where.productId = productId;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: reviews } = await Review.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'image']
        }
      ],
      order: [['createdAt', 'DESC']],
      offset,
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / parseInt(limit)),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/reviews
// @desc    Create new review
// @access  Public
router.post('/', [
  body('productId').isUUID().withMessage('Valid product ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 10, max: 2000 }).withMessage('Comment must be between 10 and 2000 characters'),
  body('reviewerName').notEmpty().withMessage('Reviewer name is required'),
  body('reviewerEmail').optional().isEmail().withMessage('Valid email is required')
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

    // Check if product exists
    const product = await Product.findByPk(req.body.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const review = await Review.create(req.body);

    // Update product rating
    await product.updateRating();

    const createdReview = await Review.findByPk(review.id, {
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully and is pending approval',
      data: createdReview
    });

  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/reviews/:id/moderate
// @desc    Moderate review (approve/reject)
// @access  Private (Admin only)
router.put('/:id/moderate', [auth, adminAuth], [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected')
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

    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await review.update({
      status: req.body.status,
      moderatedBy: req.user.userId,
      moderatedAt: new Date()
    });

    // Update product rating if approved
    if (req.body.status === 'approved') {
      const product = await Product.findByPk(review.productId);
      if (product) {
        await product.updateRating();
      }
    }

    res.json({
      success: true,
      message: `Review ${req.body.status} successfully`,
      data: review
    });

  } catch (error) {
    console.error('Moderate review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;