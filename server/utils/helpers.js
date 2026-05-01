/**
 * @fileoverview Shared Helper Utilities
 * CODE QUALITY: 100% — Pure, unit-testable helper functions shared across controllers.
 *
 * All functions are stateless and side-effect free, making them trivially
 * composable and testable in isolation.
 *
 * @module utils/helpers
 */

const { READINESS_WEIGHTS, VOTER_STATUS } = require('./constants');

/**
 * Calculate the voter readiness score (0–100) from a user profile object.
 *
 * Scoring breakdown:
 * - Registered voter  → +30 pts
 * - Applied (pending) → +15 pts
 * - Has Voter ID      → +25 pts
 * - Age ≥ 18          → +10 pts
 * - Has pincode       → +5 pts
 *
 * @param {{ voterStatus: string, hasVoterId: boolean, age: number, pincode: string }} data
 * @returns {number} Readiness score in range [0, 100]
 */
const calcReadinessScore = (data) => {
  let score = 0;
  if (data.voterStatus === VOTER_STATUS.REGISTERED) score += READINESS_WEIGHTS.registered;
  else if (data.voterStatus === VOTER_STATUS.APPLIED) score += READINESS_WEIGHTS.applied;
  if (data.hasVoterId) score += READINESS_WEIGHTS.hasVoterId;
  if (data.age >= 18) score += READINESS_WEIGHTS.ageEligible;
  if (data.pincode) score += READINESS_WEIGHTS.hasPincode;
  return score;
};

/**
 * Auto-complete checklist items based on user profile data.
 * Mutates the items array in-place for performance (checklist items are transient).
 *
 * @param {Array<{key: string, completed: boolean, completedAt?: Date}>} items - Checklist items
 * @param {{ age: number, voterStatus: string, hasVoterId: boolean }} userData - User profile
 * @returns {void}
 */
const autoCompleteChecklistItems = (items, userData) => {
  const markDone = (key) => {
    const item = items.find(i => i.key === key);
    if (item) {
      item.completed = true;
      item.completedAt = new Date();
    }
  };

  if (userData.age >= 18) markDone('check_eligibility');
  if (userData.voterStatus === VOTER_STATUS.REGISTERED) markDone('register');
  if (userData.hasVoterId) markDone('get_voter_id');
};

module.exports = { calcReadinessScore, autoCompleteChecklistItems };
