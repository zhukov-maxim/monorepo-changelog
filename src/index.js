'use strict';

const fs = require('fs');
const changelog = require('./changelog');
const io = require('./io');

// By default returns a changelog for last two weeks.
const DEFAULT_NUMBER_OF_LAST_DAYS = 14;

const rawDefaultStartDate = new Date();
rawDefaultStartDate.setDate(rawDefaultStartDate.getDate() - DEFAULT_NUMBER_OF_LAST_DAYS);
const formattedDefaultStartDate = changelog.formatDate(rawDefaultStartDate);

const rawDefaultEndDate = new Date();
const formattedDefaultEndDate = changelog.formatDate(rawDefaultEndDate);

const defaultOptions = {
  monoRepoPath: __dirname,
  startDate: formattedDefaultStartDate,
  endDate: formattedDefaultEndDate
};

const getMonorepoChangelog = (userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions);

  if (!io.isDirectoryExists(options.monoRepoPath)) {
    const errorMessage = `Monorepo path '${options.monoRepoPath}' doesn't exist.`;
    throw new Error(errorMessage);
  }

  const { monoRepoPath, startDate, endDate } = options;

  // Read all files except for junk and files inside node_modules.
  const allFiles = io.walkDir(monoRepoPath, true, true);

  // Filter changelog files.
  const changelogFiles = allFiles.filter(element => element.endsWith('CHANGELOG.md'));

  // Get content of all changelog files.
  const changelogs = changelogFiles.map(element => fs.readFileSync(element, 'utf8'));

  // Get new parts of updated changelogs.
  const updatedChangelogs = changelog.getUpdatedChangelogs(changelogs, startDate, endDate);

  return updatedChangelogs;
};

module.exports = getMonorepoChangelog;
