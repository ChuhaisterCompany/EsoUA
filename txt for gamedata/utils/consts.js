const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');

// const FILE_PATH = path.resolve(BASE_DIR, '../update-36/ut.lang.txt');
const FILE_PATH = path.resolve(__dirname, '../csv/en.lang.csv');

const BASE_PATTERN = /"(?<key>\d+-\d+-\d+)"(,|;)"(?<value>([\w\s\\n$&+,:;=?@#|'<>.^*\-()%!"])*?)"/;
// const PATTERN_FOR_UPDATE_0 =
//   /"(?<key>\d+-\d+-\d+)"(,|;)"(?<value>([\w\s\\n$&+,:;=?@#|'<>.^*\-()%!"])*?)"(,|;)""/;
const PATTERN_FOR_UPDATE = new RegExp(BASE_PATTERN + '(,|;)""');

const CSV = {
  patternForUpdate: PATTERN_FOR_UPDATE,
  keyPattern: BASE_PATTERN,
  outputDir: 'csv_ids',
};

const TXT = {
  keyPattern: /(\{?\{?(?<key>\d+-\d+-\d+):?\}?\}?) ?(?<value>.+)/,
  outputDir: 'txt_ids',
};

module.exports = {
  BASE_DIR,
  CSV,
  FILE_PATH,
  TXT,
};
