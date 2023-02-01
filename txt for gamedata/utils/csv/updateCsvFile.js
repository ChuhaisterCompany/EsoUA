const fs = require('fs');
const path = require('path');

const getCsvTable = require('./getCsvTable');

fs.readFile(
  path.resolve(__dirname, '..', '..', 'csv', 'en.lang.csv'),
  { encoding: 'utf8' },
  (err, data) => {
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

    fs.writeFile(
      path.resolve(__dirname, '..', '..', 'csv', 'en-updated.lang.csv'),
      getCsvTable(Object.entries(dataObj)),
      (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
      },
    );
  },
);
