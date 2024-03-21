// seed.js (a utility to seed/initialize the database)
require('dotenv').config();
require('./config/database');

const Platform = require('./models/platform');
const Company = require('./models/company');

// For better organization, the seed data is being stored in a separate data.js module
const data = require('./data');

// removes documents from the movies and performers collections in paralllel
(async function() {
  // Save the promises (or call right in the array if feeling frisky)
  const p1 = Platform.deleteMany({});
  const p2 = Company.deleteMany({});
  // Promise.all will return a single promise that resolves
  // only after all of the array's promises resolve
  let results = await Promise.all([p1, p2, p3]);
  // results will be an array of result objects!
  console.log(results);

  // This time, provide the array of promises in-line
  results = await Promise.all([
    Platform.create(data.platforms),
  ]);
  console.log('Created platforms:', results[0]);

  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();
