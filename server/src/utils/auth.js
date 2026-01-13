// src/utils/auth.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET || 'fallback_secret_key_for_development',
    { expiresIn: '7d' }
  );
};

const getUserIdFromToken = (token) => {
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'fallback_secret_key_for_development');
    return decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

module.exports = {
  generateToken,
  getUserIdFromToken
};