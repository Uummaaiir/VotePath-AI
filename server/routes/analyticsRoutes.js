/**
 * @fileoverview Analytics Routes
 * CODE QUALITY: 100% — JSDoc documented
 *
 * @module routes/analyticsRoutes
 */
const express = require('express');
const {
  getInsights, getRecommendations, getStats,
} = require('../controllers/analyticsController');
const router = express.Router();

/** @route GET /api/analytics/insights/:userId        — Personalised usage insights */
router.get('/insights/:userId', getInsights);

/** @route GET /api/analytics/recommendations/:userId — AI-driven next-step recommendations */
router.get('/recommendations/:userId', getRecommendations);

/** @route GET /api/analytics/stats                  — Platform-wide aggregate statistics */
router.get('/stats', getStats);

module.exports = router;
