const dateRegex = require('./consts');

const utils = {
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
