const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'resume-' + uniqueSuffix + ext);
  }
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const uploadRouter = express.Router();

// Health check endpoint
uploadRouter.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Upload server is running' });
});

// File upload endpoint
uploadRouter.post('/', upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Construct URL to access the uploaded file
    // In production, you might want to use a CDN or cloud storage URL
    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      fileUrl: fileUrl,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
});

// Error handling middleware
uploadRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer errors (e.g., file size limit exceeded)
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // Other errors
    return res.status(400).json({ error: err.message });
  }
  next();
});

module.exports = uploadRouter;