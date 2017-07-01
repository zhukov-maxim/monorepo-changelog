'use strict';

// Date format 'YYYY-DD-MM'.
const dateRegex = /\d{4}-\d{2}-\d{2}/g;

const utils = {
  // Returns formatted date 'YYYY-DD-MM'.
  formatDate(date) {
    const year = date.getFullYear();
    const month = (`0${(date.getMonth() + 1)}`).slice(-2);
    const day = (`0${(date.getDate())}`).slice(-2);

    return `${year}-${month}-${day}`;
  },

  // Get parts of changelogs updated between startDate and date inclusively.
  getUpdatedChangelogs: (changelogs, startDate, endDate) => {
    const updatedChangelogs = [];

    changelogs.forEach((changelog) => {
      const changelogPart = utils.getChangelogPart(changelog, startDate, endDate);
      const hasUpdate = changelogPart.match(dateRegex);

      if (hasUpdate) {
        updatedChangelogs.push(changelogPart);
      }
    });

    return updatedChangelogs.join('\n\n\n');
  },

  // Get the part of a changelog between startDate and date inclusively.
  getChangelogPart: (changelog, startDate, endDate) => {
    const titleLine = changelog.split('\n')[0];
    const indexOfWordChangelog = titleLine.indexOf(' changelog');
    const title = titleLine.substring(0, indexOfWordChangelog);

    const indexOfLatestRelease = changelog.indexOf('## ') + 3;
    const allReleases = changelog.substring(indexOfLatestRelease);
    const allReleasesArray = allReleases.split('\n\n\n## ');

    const releasesBetweenDatesArray = allReleasesArray.filter((release) => {
      const releaseDate = release.match(dateRegex);

      return releaseDate >= startDate && releaseDate <= endDate;
    });

    return `${title}\n\n## ${releasesBetweenDatesArray.join('\n\n\n## ')}`;
  }
};

module.exports = utils;
