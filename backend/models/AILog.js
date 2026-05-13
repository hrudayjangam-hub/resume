const mongoose = require('mongoose');

const aiLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  aiResponse: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['summary', 'improve', 'skills', 'cover-letter', 'full-resume', 'analysis'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AILog', aiLogSchema);
