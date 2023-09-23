const fs = require('fs');
const path = require('path');

const { BASE_DIR, CSV } = require('../consts');
const getCsvTable = require('./getCsvTable');

const generateCsvFiles = (ids) => {
  Object.entries(ids).forEach(([baseId, entries]) => {
    fs.writeFile(
      path.resolve(BASE_DIR, CSV.outputDir, `${baseId}.csv`),
      getCsvTable(entries),
      (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
      },
    );
  });
};

module.exports = generateCsvFiles;
