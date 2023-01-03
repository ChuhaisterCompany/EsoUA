const fs = require('fs');
const path = require('path');

const KEY_PATTERN = /(\{?\{?(?<key>\d+-\d+-\d+):?\}?\}?) ?(?<value>.+)/;
const FILE_PATH = 'update-36/ut.lang.txt';
const OUTPUT_DIR = 'ids';

// Use this function if you need only key
// const getOutputStr = (key, value) => key;
const getOutputStr = (key, value) => `${key} ${value}`;

if (!fs.existsSync(path.resolve(__dirname, OUTPUT_DIR))) {
  fs.mkdirSync(path.resolve(__dirname, OUTPUT_DIR));
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

    keys[baseId].push(getOutputStr(key, value));

    return keys;
  }, {});

const generateTxtFiles = (ids) => {
  Object.entries(ids).forEach(([baseId, idArr]) => {
    fs.writeFile(
      path.resolve(__dirname, OUTPUT_DIR, `${baseId}.txt`),
      idArr.join('\r\n'),
      (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
      },
    );
  });
};

fs.readFile(path.resolve(__dirname, FILE_PATH), { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  const ids = generateIdsObject(data);

  generateTxtFiles(ids);
});
