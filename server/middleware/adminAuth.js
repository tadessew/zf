const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  try {
    // Check if user is admin (from environment variables)
    if (req.user.userId === 'admin') {
      return next();
    }

    // Check if user exists in database and has admin role
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. User not found.'
      });
    }

    if (user.role !== 'admin' && user.role !== 'staff') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Account is not active.'
      });
    }

    next();

  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = adminAuth;