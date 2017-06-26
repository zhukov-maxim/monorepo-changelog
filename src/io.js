const fs = require('fs');
const junk = require('junk');

const io = {
  // Synchronously checks if the directory exists.
  isDirectoryExists: dir => fs.existsSync(dir),

  // Returns a list of files inside the directory and all subdirectories.
  walkDir: (dir, filterJunk = false, filterNodeModules = false) => {
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
        results = results.concat(io.walkDir(file, filterJunk, filterNodeModules));
      } else {
        results.push(file);
      }
    });

    return results;
  }
};

module.exports = io;
