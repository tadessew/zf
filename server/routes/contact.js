const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('subject').isIn([
    'custom-order',
    'quote-request',
    'product-inquiry',
    'design-consultation',
    'delivery-inquiry',
    'support',
    'partnership',
    'other'
  ]).withMessage('Invalid subject'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
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

    const { name, email, phone, subject, message, preferredContact, urgency } = req.body;

    // Create contact record
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      preferredContact,
      urgency
    });

    await contact.save();

    // Send notification email to admin
    const adminEmailContent = `
      New contact form submission:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Subject: ${subject}
      Preferred Contact: ${preferredContact}
      Urgency: ${urgency}
      
      Message:
      ${message}
      
      Submitted at: ${new Date().toLocaleString()}
    `;

    try {
      await sendEmail({
        to: process.env.EMAIL_FROM,
        subject: `New Contact Form Submission - ${subject}`,
        text: adminEmailContent
      });
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
    }

    // Send confirmation email to user
    const userEmailContent = `
      Dear ${name},
      
      Thank you for contacting FurniCraft! We have received your message and will get back to you soon.
      
      Your message details:
      Subject: ${subject}
      Message: ${message}
      
      We typically respond within 24 hours. If your inquiry is urgent, please call us at (555) 123-4567.
      
      Best regards,
      The FurniCraft Team
    `;

    try {
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting FurniCraft',
        text: userEmailContent
      });
    } catch (emailError) {
      console.error('Failed to send user confirmation email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (Admin only)
// @access  Private (Admin only)
router.get('/', [auth, adminAuth], async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      urgency,
      subject,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;
    if (subject) filter.subject = subject;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Contact.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact submission
// @access  Private (Admin only)
router.get('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact submission status
// @access  Private (Admin only)
router.put('/:id', [auth, adminAuth], [
  body('status').optional().isIn(['new', 'in-progress', 'resolved', 'closed']).withMessage('Invalid status'),
  body('assignedTo').optional().isString(),
  body('notes').optional().isString(),
  body('followUpDate').optional().isISO8601().withMessage('Invalid follow-up date')
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

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact submission updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact submission
// @access  Private (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;