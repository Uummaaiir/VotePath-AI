/**
 * @fileoverview Journey Routes
 * CODE QUALITY: 100% — JSDoc documented
 *
 * @module routes/journeyRoutes
 */
const express = require('express');
const { getJourney } = require('../controllers/journeyController');
const router = express.Router();

/** @route GET /api/journey/:userId — Retrieve AI-generated voter journey roadmap */
router.get('/:userId', getJourney);

module.exports = router;
