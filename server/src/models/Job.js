// src/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requirements: [{
    type: String,
    required: true
  }],
  salary: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    trim: true,
    default: function() { return this.title; }
  },
  hours: {
    type: Number,
    default: 0
  },
  duties: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  support: {
    type: String,
    trim: true
  },
  studentEmployment: {
    type: Boolean,
    default: false
  },
  openDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open'
  },
  subject: {
    type: String,
    trim: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);