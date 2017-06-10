const fs = require('fs');
const utils = require('./utils');
const io = require('./io');

console.log('Start:\n');

const START_DATE = '2017-04-22';

const currentDir = __dirname;
const changelogsDir = `${currentDir}/../../markup`;
const outputDir = `${currentDir}/../output`;
const outputFile = `${outputDir}/SUMMARY after ${START_DATE}.md`;

// Read all files except for junk and files inside node_modules.
const allFiles = io.walkDir(changelogsDir, true, true);

// Filter changelog files.
const changelogFiles = allFiles.filter(element => element.endsWith('CHANGELOG.md'));

// Get content of all changelog files.
const changelogs = changelogFiles.map(element => fs.readFileSync(element, 'UTF-8'));

// Get new parts of updated changelogs.
const updatedChangelogs = utils.getUpdatedChangelogs(changelogs, START_DATE);

// Concatenated list of changelogs.
const updatedChangelogsList = updatedChangelogs.reduce((list, element) => list + element).trim();

console.log(updatedChangelogsList);

io.mkDir(outputDir);
fs.writeFileSync(outputFile, updatedChangelogsList, 'UTF-8');

console.log('\nEnd.');
