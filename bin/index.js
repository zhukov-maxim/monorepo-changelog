#! /usr/bin/env node

const MonorepoChangelog = require('../src/index.js');

const monorepoChangelog = new MonorepoChangelog({
  monoRepoPath: `${__dirname}/../../markup`,
  startDate: '2017-04-23'
});

const result = monorepoChangelog.getChangelog();

console.log(result);
