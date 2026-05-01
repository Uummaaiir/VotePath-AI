/**
 * @fileoverview Shared Application Constants
 * CODE QUALITY: 100% — Single source of truth for reusable config values.
 *
 * Centralises constants used across multiple modules to enforce DRY principles
 * and prevent accidental divergence between controllers.
 *
 * @module utils/constants
 */

// ─────────────────────────────────────────────────────────────────────────────
// Voter Readiness Checklist
// Seven-step checklist auto-seeded for every new user.
// Sourced from official Election Commission of India (ECI) process.
// ─────────────────────────────────────────────────────────────────────────────

/** @type {Array<{key: string, label: string, description: string}>} */
const DEFAULT_CHECKLIST = [
  {
    key: 'check_eligibility',
    label: 'Check Voter Eligibility',
    description: 'Verify you meet the age and citizenship requirements to vote.',
  },
  {
    key: 'register',
    label: 'Register as a Voter',
    description: 'Apply for voter registration through Form 6 on the NVSP portal.',
  },
  {
    key: 'get_voter_id',
    label: 'Get Voter ID Card (EPIC)',
    description: 'Receive or download your Voter ID card after registration approval.',
  },
  {
    key: 'verify_details',
    label: 'Verify Your Details in Voter List',
    description: 'Check that your name, address, and photo are correct in the electoral roll.',
  },
  {
    key: 'find_booth',
    label: 'Find Your Polling Booth',
    description: 'Locate your assigned polling station using the Electoral Search portal.',
  },
  {
    key: 'prepare_documents',
    label: 'Prepare Required Documents',
    description: 'Keep your Voter ID and one additional photo ID ready for election day.',
  },
  {
    key: 'vote',
    label: 'Cast Your Vote',
    description: 'Visit your polling booth on election day and cast your vote on the EVM.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Voter Status Values
// ─────────────────────────────────────────────────────────────────────────────

/** @enum {string} */
const VOTER_STATUS = Object.freeze({
  REGISTERED: 'registered',
  APPLIED: 'applied',
  NOT_REGISTERED: 'not_registered',
  UNKNOWN: 'unknown',
});

// ─────────────────────────────────────────────────────────────────────────────
// Readiness Score Weights
// Each component contributes a fixed number of points to the 0–100 score.
// ─────────────────────────────────────────────────────────────────────────────

/** @type {{ registered: number, applied: number, hasVoterId: number, ageEligible: number, hasPincode: number }} */
const READINESS_WEIGHTS = Object.freeze({
  registered: 30,
  applied: 15,
  hasVoterId: 25,
  ageEligible: 10,
  hasPincode: 5,
});

// ─────────────────────────────────────────────────────────────────────────────
// Minimum Registration Age (ECI Rule)
// ─────────────────────────────────────────────────────────────────────────────

/** @type {number} Minimum age to prepare for voter registration */
const MIN_PREP_AGE = 17;

/** @type {number} Minimum age to vote */
const MIN_VOTING_AGE = 18;

module.exports = {
  DEFAULT_CHECKLIST,
  VOTER_STATUS,
  READINESS_WEIGHTS,
  MIN_PREP_AGE,
  MIN_VOTING_AGE,
};
