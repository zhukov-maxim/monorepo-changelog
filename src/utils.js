'use strict';

const dateRegex = /\d{4}-\d{2}-\d{2}/g;

const utils = {
  // Get parts of changelogs updated since START_DATE.
  // Start date is included.
  getUpdatedChangelogs: (changelogs, startDate) => {
    const updatedChangelogs = [];

    changelogs.forEach((changelog) => {
      const newPart = utils.getNewPartOfChangelog(changelog, startDate);
      const hasUpdate = newPart.match(dateRegex);

      if (hasUpdate) {
        const formattedNewPart = utils.stripWordChangelog(newPart);
        updatedChangelogs.push(formattedNewPart);
      }
    });

    return updatedChangelogs;
  },

  // Get the part of a changelog not older than start date.
  getNewPartOfChangelog: (changelog, startDate) => {
    const datesAll = changelog.match(dateRegex);
    const datesBeforeStart = datesAll.filter(element => element < startDate);
    const previousReleaseDate = datesBeforeStart[0];

    const previousReleaseDateIndex = changelog.indexOf(previousReleaseDate);
    const lastIndex = changelog.lastIndexOf('##', previousReleaseDateIndex);
    const newPart = changelog.substring(0, lastIndex).trim().concat('\n\n\n');

    return newPart;
  },

  // Remove word 'changelog' from changelog title.
  stripWordChangelog: (changelog) => {
    const removedPart = ' changelog';
    const firstLine = changelog.split('\n')[0];
    const lastIndex = firstLine.lastIndexOf(removedPart);

    const beforeRemovedPart = changelog.substring(0, lastIndex);
    const afterRemovedPart = changelog.substring(lastIndex + removedPart.length);
    const strippedChangelog = beforeRemovedPart.concat(afterRemovedPart);

    return strippedChangelog;
  }
};

module.exports = utils;
