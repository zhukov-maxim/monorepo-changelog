const assert = require('assert');
const MonorepoChangelog = require('./index.js');

describe('monorepoChangelog', () => {
  it('should thow an error if monoRepoPath doesn\'t exist', () => {
    assert.throws(() => {
      // eslint-disable-next-line no-unused-vars
      const monorepoChangelog = new MonorepoChangelog({
        monoRepoPath: `${__dirname}/directoryDoesNotExist`
      });
    }, Error);
  });

  it('should return an empty string if no changelog files found', () => {
    const monorepoChangelog = new MonorepoChangelog();
    assert.equal('', monorepoChangelog.getChangelog());
  });

  it('should return non-empty changelog', () => {
    const monorepoChangelog = new MonorepoChangelog({
      monoRepoPath: `${__dirname}/../../markup`
    });
    assert.ok(monorepoChangelog.getChangelog());
  });

  it('should write a file', () => {
    const monorepoChangelog = new MonorepoChangelog({
      monoRepoPath: `${__dirname}/../../markup`,
      outputPath: `${__dirname}/../output`,
      startDate: '2017-04-23'
    });
    assert.equal(0, monorepoChangelog.writeChangelog());
  });
});
