const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const sanitizeResumeData = (data) => {
  const allowedFields = ['title', 'template', 'personalInfo', 'education', 'experience', 'skills', 'certifications', 'projects', 'customization', 'achievements'];
  const sanitized = {};
  allowedFields.forEach(field => {
    if (data[field] !== undefined) {
      sanitized[field] = data[field];
    }
  });
  return sanitized;
};

module.exports = { generateToken, validateEmail, sanitizeResumeData };
