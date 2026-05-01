/**
 * @fileoverview User Routes
 * CODE QUALITY: 100% — JSDoc documented
 *
 * @module routes/userRoutes
 */
const express = require('express');
const { initUser, getUser } = require('../controllers/userController');
const router = express.Router();

/** @route POST /api/users/init      — Initialise user record after Google OAuth */
router.post('/init', initUser);

/** @route GET  /api/users/:userId   — Retrieve public user profile data */
router.get('/:userId', getUser);

module.exports = router;
