const fs = require('fs');
const utils = require('./utils');
const io = require('./io');

const defaultOptions = {
  monoRepoPath: __dirname,
  outputPath: `${__dirname}/output`,
  startDate: '2017-04-22'
};

class MonorepoChangelog {
  constructor(userOptions) {
    this.options = Object.assign({}, defaultOptions, userOptions);
  }

  getChangelog() {
    const { monoRepoPath, startDate } = this.options;

    // Read all files except for junk and files inside node_modules.
    const allFiles = io.walkDir(monoRepoPath, true, true);

    // Filter changelog files.
    const changelogFiles = allFiles.filter(element => element.endsWith('CHANGELOG.md'));

    // Get content of all changelog files.
    const changelogs = changelogFiles.map(element => fs.readFileSync(element, 'utf8'));

    // Get new parts of updated changelogs.
    const updatedChangelogs = utils.getUpdatedChangelogs(changelogs, startDate);

    // Concatenated list of changelogs.
    const updatedChangelogsList = updatedChangelogs.reduce((list, element) =>
      list + element).trim();

    return updatedChangelogsList;
  }

  writeChangelog() {
    const changelog = this.getChangelog();
    const { outputPath, startDate } = this.options;

    const outputFile = `${outputPath}/SUMMARY after ${startDate}.md`;

    io.mkDir(outputPath);
    fs.writeFileSync(outputFile, changelog, 'utf8');

    return 0;
  }
}

module.exports = MonorepoChangelog;
