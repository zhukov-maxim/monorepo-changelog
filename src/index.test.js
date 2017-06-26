'use strict';

const assert = require('assert');
const getMonorepoChangelog = require('./index.js');

describe('monorepoChangelog', () => {
  it('should throw an error if monoRepoPath doesn\'t exist', () => {
    assert.throws(() => {
      // eslint-disable-next-line no-unused-vars
      getMonorepoChangelog({
        monoRepoPath: `${__dirname}/directoryDoesNotExist`
      });
    }, Error);
  });

  it('should return an empty string if no changelog files found', () => {
    assert.equal('', getMonorepoChangelog());
  });

  it('should return non-empty changelog', () => {
    assert.ok(getMonorepoChangelog({
      monoRepoPath: `${__dirname}/../../markup`
    }));
  });
});
