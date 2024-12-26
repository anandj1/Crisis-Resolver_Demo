import express from 'express';
import { auth } from '../middleware/auth.js';
import { upload, getFileStream } from '../utils/upload.js';
import { ValidationError } from '../utils/errors.js';

const router = express.Router();

// Upload single image
router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ValidationError('No file uploaded');
    }
    
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename
    });
  } catch (error) {
    next(error);
  }
});

// Get image by filename
router.get('/:filename', async (req, res, next) => {
  try {
    const stream = await getFileStream(req.params.filename);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
});

export default router;