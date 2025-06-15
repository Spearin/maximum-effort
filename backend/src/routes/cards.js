const express = require('express');

/**
 * Basic card template definitions. These would normally come from the database.
 * @type {Array<{id:string,type:string,rarity:string,name:string,description:string,effects:object}>}
 */
const cardTemplates = [
  {
    id: 'character-ace',
    type: 'character',
    rarity: 'rare',
    name: 'Ace Pilot',
    description: 'Improves mission success chance',
    effects: { skill: '+1' },
  },
  {
    id: 'object-map',
    type: 'object',
    rarity: 'common',
    name: 'Navigational Map',
    description: 'Helps keep the squadron on course',
    effects: { navigate: '+1' },
  },
  {
    id: 'talisman-charm',
    type: 'talisman',
    rarity: 'exclusive',
    name: 'Lucky Charm',
    description: 'Boosts crew morale',
    effects: { morale: '+2' },
  },
];

const router = express.Router();

/**
 * GET /api/cards/templates
 * Returns all available card templates.
 */
router.get('/cards/templates', (req, res) => {
  res.json(cardTemplates);
});

module.exports = router;
module.exports.cardTemplates = cardTemplates;
