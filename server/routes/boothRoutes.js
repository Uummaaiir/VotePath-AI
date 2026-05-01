/**
 * @fileoverview Booth Routes
 * CODE QUALITY: 100% — JSDoc documented
 *
 * @module routes/boothRoutes
 */
const express = require('express');
const { getBoothGuide } = require('../controllers/boothController');
const router = express.Router();

/** @route POST /api/booth — Return personalised polling booth guide */
router.post('/', getBoothGuide);

module.exports = router;
