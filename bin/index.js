#! /usr/bin/env node

'use strict';

const getMonorepoChangelog = require('../src/index.js');

const options = {
  monoRepoPath: `${__dirname}/../../markup`
};

const result = getMonorepoChangelog(options);

console.log(result);
