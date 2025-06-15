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

module.exports = router;

