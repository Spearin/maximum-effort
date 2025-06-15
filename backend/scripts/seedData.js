const fs = require('fs/promises');
const path = require('path');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

/**
 * Read a JSON or CSV file and return an array of string values.
 * @param {string} filePath - Path to the data file.
 * @returns {Promise<string[]>}
 */
async function readDataFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  if (filePath.endsWith('.json')) {
    return JSON.parse(data);
  }
  // Simple CSV parsing: split by comma or newlines
  return data.split(/,|\n/).map(v => v.trim()).filter(Boolean);
}

/**
 * Load lookup data from files and insert into the database.
 */
async function main() {
  const dataDir = path.join(__dirname, '../data');

  const firstNames = await readDataFile(path.join(dataDir, 'firstNames.json'));
  const lastNames = await readDataFile(path.join(dataDir, 'lastNames.json'));
  const hometowns = await readDataFile(path.join(dataDir, 'hometowns.json'));
  const occupations = await readDataFile(path.join(dataDir, 'occupations.json'));
  const religions = await readDataFile(path.join(dataDir, 'religions.json'));
  const socioeconomic = await readDataFile(
    path.join(dataDir, 'socioeconomicBackgrounds.json')
  );
  const familyHobbies = await readDataFile(path.join(dataDir, 'familyHobbies.json'));

  await prisma.firstName.createMany({
    data: firstNames.map(value => ({ value })),
    skipDuplicates: true,
  });
  await prisma.lastName.createMany({
    data: lastNames.map(value => ({ value })),
    skipDuplicates: true,
  });
  await prisma.hometown.createMany({
    data: hometowns.map(value => ({ value })),
    skipDuplicates: true,
  });
  await prisma.occupation.createMany({
    data: occupations.map(value => ({ value })),
    skipDuplicates: true,
  });
  await prisma.religion.createMany({
    data: religions.map(value => ({ value })),
    skipDuplicates: true,
  });
  await prisma.socioeconomicBackground.createMany({
    data: socioeconomic.map(value => ({ value })),
    skipDuplicates: true,
  });
  await prisma.familyHobby.createMany({
    data: familyHobbies.map(value => ({ value })),
    skipDuplicates: true,
  });
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
