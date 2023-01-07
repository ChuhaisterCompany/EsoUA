const fs = require('fs');
const path = require('path');

const { BASE_DIR, CSV_OUTPUT_DIR, FILE_PATH, KEY_PATTERN, TXT_OUTPUT_DIR } = require('./consts');
const generateTxtFiles = require('./generateTxtFiles');

const OUTPUT_DIR = TXT_OUTPUT_DIR;

if (!fs.existsSync(path.resolve(BASE_DIR, OUTPUT_DIR))) {
  fs.mkdirSync(path.resolve(BASE_DIR, OUTPUT_DIR));
}

const generateIdsObject = (data) =>
  data.split(/\r?\n/).reduce((keys, line) => {
    if (!line.length) {
      return keys;
    }

    const groups = line.match(KEY_PATTERN)?.groups;

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

  generateTxtFiles(ids);
});
