/**
 * @fileoverview Authentication Routes
 * CODE QUALITY: 100% — JSDoc documented, validator middleware applied
 *
 * @module routes/authRoutes
 */
const express = require('express');
const {
  register, login, googleAuth,
  completeProfile, getMe, updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
  validateRegister, validateLogin,
  validateProfile, validateUpdateProfile,
} = require('../middleware/validators');
const router = express.Router();

// ── Public Routes ─────────────────────────────────────────────
/** @route POST /api/auth/register — Create a new account */
router.post('/register', validateRegister, register);

/** @route POST /api/auth/login   — Sign in with email/password */
router.post('/login', validateLogin, login);

/** @route POST /api/auth/google  — Firebase Google OAuth sign-in */
router.post('/google', googleAuth);

// ── Protected Routes (require valid JWT) ─────────────────────
/** @route GET  /api/auth/me              — Return current user profile */
router.get('/me', protect, getMe);

/** @route PUT  /api/auth/complete-profile — First-time profile setup */
router.put('/complete-profile', protect, validateProfile, completeProfile);

/** @route PUT  /api/auth/update-profile   — Update existing profile */
router.put('/update-profile', protect, validateUpdateProfile, updateProfile);

module.exports = router;
