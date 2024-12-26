import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { ValidationError } from '../utils/errors.js';
import { sendVerificationEmail } from '../utils/email.js';

const router = express.Router();

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    const verificationToken = generateOTP();
    const verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = new User({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires,
    });
    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: 'Registration successful. Please check your email for verification code.',
      email,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/verify', async (req, res, next) => {
  try {
    const { email, token } = req.body;

    const user = await User.findOne({
      email,
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new ValidationError('Invalid or expired verification code');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new ValidationError('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new ValidationError('Please verify your email first');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/resend-verification', async (req, res, next) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new ValidationError('User not found');
    }

    if (user.isVerified) {
      throw new ValidationError('Email is already verified');
    }

    const verificationToken = generateOTP();
    const verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res.json({
      message: 'Verification code has been resent to your email',
    });
  } catch (error) {
    next(error);
  }
});

export default router;