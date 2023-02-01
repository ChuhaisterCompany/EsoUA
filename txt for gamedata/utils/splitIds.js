const fs = require('fs');
const path = require('path');

const { BASE_DIR, CSV, FILE_PATH, TXT } = require('./consts');
const generateCsvFiles = require('./csv').generateCsvFiles;
const generateTxtFiles = require('./generateTxtFiles');

// Please use only one of the next pieces of code:
// 1. for CSV files
// 2. for TXT files

const { keyPattern, outputDir } = CSV;
const generateFiles = generateCsvFiles;

// const { keyPattern, outputDir } = TXT;
// const generateFiles = generateTxtFiles;

if (!fs.existsSync(path.resolve(BASE_DIR, outputDir))) {
  fs.mkdirSync(path.resolve(BASE_DIR, outputDir));
}

const generateIdsObject = (data) =>
  data.split(/\r?\n/).reduce((keys, line) => {
    if (!line.length) {
      return keys;
    }

    const groups = line.match(keyPattern)?.groups;

    if (!groups) {
      return keys;
    }

    const { key, value } = groups;

    const baseId = key.split('-')[0];

    if (!keys[baseId]) {
      keys[baseId] = [];
    }

    keys[baseId].push([key, value]);

    return keys;
  }, {});

fs.readFile(path.resolve(BASE_DIR, FILE_PATH), { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  const ids = generateIdsObject(data);

  generateFiles(ids);
});
