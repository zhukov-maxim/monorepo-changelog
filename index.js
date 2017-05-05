const fs = require('fs');
const dateRegex = require('./consts');
const walkDir = require('./io');

console.log('Start:\n');

const START_DATE = '2017-04-22';

// Get the part of a changelog not older than start date.
const getNewPartOfChangelog = (changelog, startDate) => {
  const datesAll = changelog.match(dateRegex);
  const datesBeforeStart = datesAll.filter(element => element < startDate);
  const previousReleaseDate = datesBeforeStart[0];

  const previousReleaseDateIndex = changelog.indexOf(previousReleaseDate);
  const lastIndex = changelog.lastIndexOf('##', previousReleaseDateIndex);
  const newPart = changelog.substring(0, lastIndex).trim().concat('\n\n\n');

  return newPart;
};

// Remove word 'changelog' from changelog title.
const stripWordChangelog = (changelog) => {
  const removedPart = ' changelog';
  const firstLine = changelog.split('\n')[0];
  const lastIndex = firstLine.lastIndexOf(removedPart);

  const beforeRemovedPart = changelog.substring(0, lastIndex);
  const afterRemovedPart = changelog.substring(lastIndex + removedPart.length);

  const strippedChangelog = beforeRemovedPart.concat(afterRemovedPart);

  return strippedChangelog;
};

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
  const newPart = getNewPartOfChangelog(changelog, START_DATE);
  const hasUpdate = newPart.match(dateRegex);

  if (hasUpdate) {
    const formattedNewPart = stripWordChangelog(newPart);
    updatedChangelogs.push(formattedNewPart);
  }
});

const updatedChangelogsList = updatedChangelogs.reduce((list, element) => list + element).trim();

console.log(updatedChangelogsList);

const ouputFile = `${currentDir}/SUMMARY after ${START_DATE}.md`;
fs.writeFileSync(ouputFile, updatedChangelogsList, 'UTF-8');

console.log('\nEnd.');
