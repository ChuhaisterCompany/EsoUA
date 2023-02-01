const fs = require('fs');
const path = require('path');

const getCsvTable = require('./getCsvTable');

const FILE_PATH = path.resolve(__dirname, '../../csv', 'en.lang.csv');

fs.readFile(FILE_PATH, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  const dataObj = data.split(/\r?\n/).reduce((keys, line, index) => {
    if (index === 0 || !line.length) {
      return keys;
    }

    const [key, value] = line.split(',');

    keys[key] = value;

    return keys;
  }, {});

  fs.writeFile(FILE_PATH, getCsvTable(Object.entries(dataObj)), (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
  });
});
