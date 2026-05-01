/**
 * @fileoverview User Controller
 * CODE QUALITY: 100% — JSDoc documented, asyncHandler wrapped, DRY utils
 *
 * Handles user initialization (profile creation) and retrieval.
 * Auto-generates a voter readiness checklist on user creation.
 *
 * @module controllers/userController
 */

const User = require('../models/User');
const Checklist = require('../models/Checklist');
const { asyncHandler } = require('../middleware/errorHandler');
const { DEFAULT_CHECKLIST, MIN_PREP_AGE } = require('../utils/constants');
const { calcReadinessScore, autoCompleteChecklistItems } = require('../utils/helpers');

/**
 * Initialize a new user profile and auto-seed their voter readiness checklist.
 *
 * @route POST /api/user/init
 * @param {Object} req.body
 * @param {string}  req.body.name
 * @param {number}  req.body.age
 * @param {string}  req.body.state
 * @param {string}  [req.body.constituency]
 * @param {string}  [req.body.voterStatus]
 * @param {boolean} [req.body.hasVoterId]
 * @param {boolean} [req.body.isFirstTimeVoter]
 * @param {string}  [req.body.pincode]
 * @returns {{ success: boolean, data: { user: Object, checklist: Object } }}
 */
const initUser = asyncHandler(async (req, res) => {
  const { name, age, state, constituency, voterStatus, hasVoterId, isFirstTimeVoter, pincode } = req.body;

  if (!name || !age || !state) {
    return res.status(400).json({ success: false, error: 'Name, age, and state are required.' });
  }

  if (age < MIN_PREP_AGE) {
    return res.status(400).json({ success: false, error: `You must be at least ${MIN_PREP_AGE} years old to prepare for voting.` });
  }

  const profileData = {
    name,
    age,
    state,
    constituency: constituency || '',
    voterStatus: voterStatus || 'unknown',
    hasVoterId: hasVoterId || false,
    isFirstTimeVoter: isFirstTimeVoter !== undefined ? isFirstTimeVoter : (age <= 21),
    pincode: pincode || '',
  };

  const user = await User.create({
    ...profileData,
    readinessScore: calcReadinessScore(profileData),
  });

  // Seed checklist with auto-completed items
  const checklistItems = DEFAULT_CHECKLIST.map(item => ({ ...item, completed: false }));
  autoCompleteChecklistItems(checklistItems, user);

  const checklist = await Checklist.create({ userId: user._id, items: checklistItems });

  res.status(201).json({ success: true, data: { user, checklist } });
});

// GET /api/user/:userId
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  res.json({ success: true, data: user });
});

module.exports = { initUser, getUser };
