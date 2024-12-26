import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedError('Authentication required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};

export const adminAuth = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Admin access required');
    }
    next();
  } catch (error) {
    next(error);
  }
};