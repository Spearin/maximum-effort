const express = require('express');

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

module.exports = router;

