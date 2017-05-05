const fs = require('fs');
const dateRegex = require('./consts');
const utils = require('./utils');
const walkDir = require('./io');

console.log('Start:\n');

const START_DATE = '2017-04-22';

const currentDir = __dirname;
const changelogsDir = `${currentDir}/../markup`;

// Read all files except for junk and files inside node_modules.
const allFiles = walkDir(changelogsDir, true, true);

// Read all files except for junk and files inside node_modules.
const changelogFiles = allFiles.filter(element => element.endsWith('CHANGELOG.md'));

// Get content of all changelog files.
const changelogs = changelogFiles.map(element => fs.readFileSync(element, 'UTF-8'));

const updatedChangelogs = [];

// Get parts of changelogs updated since START_DATE.
// Start date is included.
changelogs.forEach((changelog) => {
  const newPart = utils.getNewPartOfChangelog(changelog, START_DATE);
  const hasUpdate = newPart.match(dateRegex);

  if (hasUpdate) {
    const formattedNewPart = utils.stripWordChangelog(newPart);
    updatedChangelogs.push(formattedNewPart);
  }
});

const updatedChangelogsList = updatedChangelogs.reduce((list, element) => list + element).trim();

console.log(updatedChangelogsList);

const ouputFile = `${currentDir}/SUMMARY after ${START_DATE}.md`;
fs.writeFileSync(ouputFile, updatedChangelogsList, 'UTF-8');

console.log('\nEnd.');
