const express = require('express');

/**
 * In-memory user profile placeholder.
 * @type {{rank: string, stamps: number, bonds: number}}
 */
const user = {
  rank: 'Recruit',
  stamps: 0,
  bonds: 0,
};

const router = express.Router();

/**
 * GET /api/user/profile
 * Returns the user's rank, stamp count and bond count.
 */
router.get('/user/profile', (req, res) => {
  res.json({ rank: user.rank, stamps: user.stamps, bonds: user.bonds });
});

/**
 * POST /api/user/stamps/grant?amount=<number>
 * Grants the specified amount of stamps to the user.
 * Returns the updated stamp count.
 */
router.post('/user/stamps/grant', (req, res) => {
  const amount = Number(req.query.amount);
  if (!Number.isInteger(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive integer' });
  }
  user.stamps += amount;
  res.json({ stamps: user.stamps });
});

/**
 * POST /api/user/bonds/grant?amount=<number>
 * Grants the specified amount of bonds to the user.
 * Returns the updated bond count.
 */
router.post('/user/bonds/grant', (req, res) => {
  const amount = Number(req.query.amount);
  if (!Number.isInteger(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive integer' });
  }
  user.bonds += amount;
  res.json({ bonds: user.bonds });
});

module.exports = router;
