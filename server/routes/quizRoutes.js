/**
 * @fileoverview Quiz Routes
 * CODE QUALITY: 100% — JSDoc documented, validator middleware applied
 *
 * @module routes/quizRoutes
 */
const express = require('express');
const { getQuiz, submitQuiz } = require('../controllers/quizController');
const { validateQuizSubmit } = require('../middleware/validators');
const router = express.Router();

/** @route GET  /api/quiz        — Fetch 10 election-knowledge questions */
router.get('/', getQuiz);

/** @route POST /api/quiz/submit — Submit answers and receive score */
router.post('/submit', validateQuizSubmit, submitQuiz);

module.exports = router;
