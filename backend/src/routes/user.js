const express = require('express');

const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const router = express.Router();

/**
 * GET /api/user/profile
 * Returns the user's rank, stamp count and bond count.
 */
router.get('/user/profile', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.json({ rank: user.rank, stamps: user.stamps, bonds: user.bonds });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/user/stamps/grant?amount=<number>
 * Grants the specified amount of stamps to the user.
 * Returns the updated stamp count.
 */
router.post('/user/stamps/grant', async (req, res, next) => {
  const amount = Number(req.query.amount);
  if (!Number.isInteger(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive integer' });
  }
  try {
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { stamps: { increment: amount } },
    });
    res.json({ stamps: updated.stamps });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/user/bonds/grant?amount=<number>
 * Grants the specified amount of bonds to the user.
 * Returns the updated bond count.
 */
router.post('/user/bonds/grant', async (req, res, next) => {
  const amount = Number(req.query.amount);
  if (!Number.isInteger(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive integer' });
  }
  try {
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { bonds: { increment: amount } },
    });
    res.json({ bonds: updated.bonds });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
