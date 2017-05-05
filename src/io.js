const fs = require('fs');
const junk = require('junk');

// Returns a list of files inside the directory and all subdirectories.
const walkDir = (dir, filterJunk = false, filterNodeModules = false) => {
  let results = [];
  let list = fs.readdirSync(dir);

  if (filterJunk) {
    list = list.filter(junk.not);
  }

  if (filterNodeModules) {
    list = list.filter(file => file !== 'node_modules');
  }

  list.forEach((fileName) => {
    const file = `${dir}/${fileName}`;
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file, filterJunk, filterNodeModules));
    } else {
      results.push(file);
    }
  });

  return results;
};

module.exports = walkDir;
