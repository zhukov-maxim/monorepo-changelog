#! /usr/bin/env node

'use strict';

const path = require('path');
const getMonorepoChangelog = require('../src/index.js');

const args = process.argv.slice(2);

if (args.length > 3) {
  throw new Error('Too many arguments.');
}

const options = {};

// Date format 'YYYY-DD-MM' (match the whole string).
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// It must be not more then one non-date argument.
const monoRepoPath = args.find(arg => !arg.match(dateRegex));
if (monoRepoPath) {
  const normalizedPath = path.resolve(process.cwd(), monoRepoPath);
  options.monoRepoPath = normalizedPath;
} else {
  options.monoRepoPath = path.resolve(process.cwd());
}

// Find all specified dates:
const dates = args.filter(arg => arg.match(dateRegex));

if (dates.length === 2) {
  const startDate = dates[0] <= dates[1] ? dates[0] : dates[1];
  const endDate = dates[0] <= dates[1] ? dates[1] : dates[0];

  options.startDate = startDate;
  options.endDate = endDate;
} else if (dates.length === 1) {
  options.startDate = dates[0];
}

const result = getMonorepoChangelog(options);

console.log(result);
