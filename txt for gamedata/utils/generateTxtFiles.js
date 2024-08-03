const fs = require('fs');
const path = require('path');

const { BASE_DIR, TXT } = require('./consts');

const getOutputStr = ([key, value]) => `${key} ${value}`;

const generateTxtFiles = (ids) => {
  Object.entries(ids).forEach(([baseId, entries]) => {
    fs.writeFile(
      path.resolve(BASE_DIR, TXT.outputDir, `${baseId}.txt`),
      entries.map(getOutputStr).join('\r\n'),
      (err) => {
        if (err) {
          console.error(err.message);
        }
      },
    );
  });
};

module.exports = generateTxtFiles;
