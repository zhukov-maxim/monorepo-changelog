const fs = require('fs');

// Returns a list of files inside the directory and all subdirectories.
const walkDir = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((fileName) => {
    const file = `${dir}/${fileName}`;

    if (file.includes('node_modules')) {
      return;
    }

    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      results.push(file);
    }
  });

  return results;
};

module.exports = walkDir;
