const express = require('express');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

/**
 * Sample bomber crew data.
 * @type {Array<{id:number,name:string,members:Array<{name:string,role:string}>}>}
 */
const crews = [
  {
    id: 1,
    name: 'Lancaster Alpha',
    members: [
      { name: 'John Smith', role: 'Pilot' },
      { name: 'Mike Brown', role: 'Navigator' },
    ],
  },
  {
    id: 2,
    name: 'Lancaster Bravo',
    members: [
      { name: 'Alice Johnson', role: 'Pilot' },
      { name: 'Robert Lee', role: 'Bombardier' },
    ],
  },
];

const router = express.Router();
const { cardTemplates } = require('./cards');

// In-memory parcel slots keyed by crew id
const crewParcels = {};
// In-memory cards assigned to each crew id
const crewCards = {};


const randomCardId = () => {
  const tpl = cardTemplates[Math.floor(Math.random() * cardTemplates.length)];
  return `${tpl.id}-${Math.random().toString(36).slice(2, 8)}`;
};

/**
 * GET /api/crews
 * Returns an array of bomber crews with id, name and crew member details.
 */
router.get('/crews', (req, res) => {
  res.json(crews);
});

/**
 * POST /api/crews/recruit
 * Recruit a number of crew members by sampling lookup tables.
 * @param {number} req.body.count Number of crew members to generate (1-10)
 * @returns {Array<{id:number,name:string,hometown:string,occupation:string,religion:string,socioeconomic:string,familyHobby:string}>}
 */
router.post('/crews/recruit', async (req, res, next) => {
  const count = Number(req.body.count);
  if (!Number.isInteger(count) || count <= 0 || count > 10) {
    return res.status(400).json({ error: 'count must be an integer between 1 and 10' });
  }

  try {
    const [firstNames, lastNames, hometowns, occupations, religions, socioeconomic, familyHobbies] = await Promise.all([
      prisma.firstName.findMany(),
      prisma.lastName.findMany(),
      prisma.hometown.findMany(),
      prisma.occupation.findMany(),
      prisma.religion.findMany(),
      prisma.socioeconomicBackground.findMany(),
      prisma.familyHobby.findMany(),
    ]);

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const crew = [];

    for (let i = 0; i < count; i++) {
      const fn = pick(firstNames);
      const ln = pick(lastNames);
      const ht = pick(hometowns);
      const oc = pick(occupations);
      const rl = pick(religions);
      const se = pick(socioeconomic);
      const fh = pick(familyHobbies);

      const created = await prisma.crewMember.create({
        data: {
          firstNameId: fn.id,
          lastNameId: ln.id,
          hometownId: ht.id,
          occupationId: oc.id,
          religionId: rl.id,
          socioeconomicBackgroundId: se.id,
          familyHobbyId: fh.id,
        },
        include: {
          firstName: true,
          lastName: true,
          hometown: true,
          occupation: true,
          religion: true,
          socioeconomicBackground: true,
          familyHobby: true,
        },
      });

      crew.push({
        id: created.id,
        name: `${created.firstName.value} ${created.lastName.value}`,
        hometown: created.hometown.value,
        occupation: created.occupation.value,
        religion: created.religion.value,
        socioeconomic: created.socioeconomicBackground.value,
        familyHobby: created.familyHobby.value,
      });
    }

    res.json(crew);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/crews/:id/parcels
 * Returns up to three parcel slots for the crew with opened state.
 */
router.get('/crews/:id/parcels', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid crew id' });
  }

  if (!crewParcels[id]) {
    crewParcels[id] = [
      { opened: false, cards: [] },
      { opened: false, cards: [] },
      { opened: false, cards: [] },
    ];
  }

  res.json(crewParcels[id].map(p => ({ opened: p.opened })));
});

/**
 * POST /api/crews/:id/parcels/open
 * Opens the specified parcel slot using stamps and returns cards.
 * @param {number} req.body.slotIndex Index of the slot to open (0-2)
 * @param {number} req.body.stamps   Number of stamps to spend
 */
router.post('/crews/:id/parcels/open', async (req, res, next) => {
  const id = Number(req.params.id);
  const { slotIndex, stamps } = req.body || {};

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid crew id' });
  }
  if (!Number.isInteger(slotIndex) || slotIndex < 0 || slotIndex > 2) {
    return res.status(400).json({ error: 'slotIndex must be 0-2' });
  }
  if (!Number.isInteger(stamps) || stamps <= 0) {
    return res.status(400).json({ error: 'stamps must be a positive integer' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || user.stamps < stamps) {
      return res.status(400).json({ error: 'not enough stamps' });
    }

    if (!crewParcels[id]) {
      crewParcels[id] = [
        { opened: false, cards: [] },
        { opened: false, cards: [] },
        { opened: false, cards: [] },
      ];
    }

    const slot = crewParcels[id][slotIndex];
    if (slot.opened) {
      return res.status(400).json({ error: 'slot already opened' });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { stamps: { decrement: stamps } },
    });

    const cardCount = Math.floor(Math.random() * 3) + 1;
    const cards = [];
    for (let i = 0; i < cardCount; i++) {
      cards.push(randomCardId());
    }

    slot.opened = true;
    slot.cards = cards;

    res.json({ parcels: crewParcels[id].map(p => ({ opened: p.opened })), cards });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/crews/:id/cards/assign
 * Assign specific card IDs to the crew.
 * @param {string[]} req.body.cardIds Array of card IDs to assign
 */
router.post('/crews/:id/cards/assign', (req, res) => {
  const id = Number(req.params.id);
  const { cardIds } = req.body || {};

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid crew id' });
  }
  if (!Array.isArray(cardIds) || cardIds.some(c => typeof c !== 'string')) {
    return res.status(400).json({ error: 'cardIds must be an array of strings' });
  }

  if (!crewCards[id]) {
    crewCards[id] = [];
  }

  crewCards[id].push(...cardIds);
  res.json({ cards: crewCards[id] });
});

module.exports = router;

