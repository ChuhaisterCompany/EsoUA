const fs = require('fs');
const path = require('path');

const { CSV, CSV_DIR, CSV_INPUT_FILE_PATH, CSV_OUTPUT_FILE_PATH } = require('../consts');
const getCsvTable = require('./getCsvTable');

const writeCSV = (data) => {
  fs.writeFile(path.resolve(CSV_DIR, CSV_OUTPUT_FILE_PATH), data, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
  });
};

fs.readFile(path.resolve(CSV_DIR, CSV_INPUT_FILE_PATH), { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  const dataObj = {};

  data.split(/\r?\n/).every((line, index) => {
    if (!line.length) {
      return true;
    }

    if (index === 0) {
      const lineArr = line.split(/[;,]/);

      if (lineArr.length <= 2) {
        return false;
      }

      return true;
    }

    const groups = line.match(CSV.patternForUpdate)?.groups;

    if (!groups) {
      return false;
    }

    const { key, value } = groups;

    dataObj[key] = value || '';

    return true;
  });

  const dataEntries = Object.entries(dataObj);

  writeCSV(dataEntries.length ? getCsvTable(dataEntries) : data);
});
