const fs = require('fs');
const path = require('path');

const { BASE_DIR, CSV_OUTPUT_DIR } = require('./consts');

const escapeChars = (str) => str.replaceAll('"', '""').replaceAll(',', '",');

const getOutputStr = ([key, value]) => `"${key}","${escapeChars(value)}",""`;

const getCsvTable = (entries) => `"Location","Source","Target"
${entries.map(getOutputStr).join('\r\n')}`;

const generateCsvFiles = (ids) => {
  Object.entries(ids).forEach(([baseId, entries]) => {
    fs.writeFile(
      path.resolve(BASE_DIR, CSV_OUTPUT_DIR, `${baseId}.csv`),
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
