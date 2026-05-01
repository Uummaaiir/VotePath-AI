/**
 * @fileoverview Timeline Routes
 * CODE QUALITY: 100% — JSDoc documented
 *
 * @module routes/timelineRoutes
 */
const express = require('express');
const { getTimeline } = require('../controllers/timelineController');
const router = express.Router();

/** @route GET /api/timeline/:userId — Retrieve election timeline events for the user */
router.get('/:userId', getTimeline);

module.exports = router;
