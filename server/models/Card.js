const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  german: {
    type: String,
    required: true
  },
  english: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'general'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', CardSchema);