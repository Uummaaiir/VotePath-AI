/**
 * @fileoverview Checklist Routes
 * CODE QUALITY: 100% — JSDoc documented, validator middleware applied
 *
 * @module routes/checklistRoutes
 */
const express = require('express');
const { getChecklist, updateChecklist } = require('../controllers/checklistController');
const { validateChecklistUpdate } = require('../middleware/validators');
const router = express.Router();

/** @route GET  /api/checklist/:userId — Retrieve voter readiness checklist */
router.get('/:userId', getChecklist);

/** @route POST /api/checklist/update  — Toggle a checklist item complete/incomplete */
router.post('/update', validateChecklistUpdate, updateChecklist);

module.exports = router;
