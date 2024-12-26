import express from 'express';
import Issue from '../models/Issue.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

const router = express.Router();

// Get all issues
router.get('/', auth, async (req, res, next) => {
  try {
    const issues = await Issue.find()
      .populate('reporterId', 'name')
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    next(error);
  }
});

// Create new issue
router.post('/', auth, async (req, res, next) => {
  try {
    const issue = new Issue({
      ...req.body,
      reporterId: req.user.userId,
    });
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    next(error);
  }
});

// Update issue status
router.patch('/:id/status', auth, async (req, res, next) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findById(req.params.id);
    
    if (!issue) {
      throw new NotFoundError('Issue not found');
    }

    if (req.user.role !== 'admin' && issue.reporterId.toString() !== req.user.userId) {
      throw new ValidationError('Not authorized to update this issue');
    }

    issue.status = status;
    await issue.save();
    res.json(issue);
  } catch (error) {
    next(error);
  }
});

// Assign issue to user (admin only)
router.patch('/:id/assign', auth, adminAuth, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { assignedTo: userId },
      { new: true }
    );
    
    if (!issue) {
      throw new NotFoundError('Issue not found');
    }

    res.json(issue);
  } catch (error) {
    next(error);
  }
});

export default router;