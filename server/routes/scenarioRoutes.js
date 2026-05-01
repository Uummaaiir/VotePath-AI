/**
 * @fileoverview Scenario Routes
 * CODE QUALITY: 100% — JSDoc documented
 *
 * @module routes/scenarioRoutes
 */
const express = require('express');
const { runScenario, getScenarios } = require('../controllers/scenarioController');
const router = express.Router();

/** @route GET  /api/scenarios/list — List all available voting scenarios */
router.get('/list', getScenarios);

/** @route POST /api/scenarios      — Run a specific voting scenario simulation */
router.post('/', runScenario);

module.exports = router;
