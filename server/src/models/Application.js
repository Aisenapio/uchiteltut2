// src/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'invited', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    trim: true
  }
}, {
  timestamps: false // Мы используем свои поля для дат
});

// Индекс для уникальности отклика (учитель не может откликнуться дважды на одну вакансию)
applicationSchema.index({ teacher: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;