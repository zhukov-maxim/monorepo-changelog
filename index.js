const fs = require('fs');

console.log('Start:\n');

const dateRegex = /\d{4}-\d{2}-\d{2}/g;
const startDate = '2017-04-20';

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((fileName) => {
    const file = `${dir}/${fileName}`;

    if (file.includes('node_modules')) {
      return;
    }

    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });

  return results;
};

const getNewPartOfChangelog = (changelog, previousDate) => {
  const sampleDates = changelog.match(dateRegex);
  const datesBeforeStart = sampleDates.filter(element => element <= previousDate);
  const previousReleaseDate = datesBeforeStart[0];

  const previousReleaseDateIndex = changelog.indexOf(previousReleaseDate);
  const lastIndex = changelog.lastIndexOf('##', previousReleaseDateIndex);
  const newPart = changelog.substring(0, lastIndex).trim().concat('\n\n\n');

  return newPart;
};

const currentDir = __dirname;
const changelogsDir = `${currentDir}/../markup`;

const allFiles = walk(changelogsDir);
const changelogFiles = allFiles.filter((element) => {
  if (element.includes('CHANGELOG.md')) {
    return true;
  }
  return false;
});

const changelogs = changelogFiles.map(element => fs.readFileSync(element, 'UTF-8'));

const newChangelogs = [];
changelogs.forEach((element) => {
  const newPart = getNewPartOfChangelog(element, startDate);
  const hasUpdate = newPart.match(dateRegex);

  if (hasUpdate) {
    newChangelogs.push(newPart);
  }
});

const newChangelogsList = newChangelogs.reduce((list, element) => list + element).trim();

console.log(newChangelogsList);

const ouputFile = `${currentDir}/SUMMARY after ${startDate}.md`;
fs.writeFileSync(ouputFile, newChangelogsList, 'UTF-8');

console.log('\nEnd.');
