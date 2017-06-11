const assert = require('assert');
const MonorepoChangelog = require('./index.js');

describe('monorepoChangelog', () => {
  it('should return non empty changelog', () => {
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
