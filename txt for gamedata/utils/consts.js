const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');

// const FILE_PATH = path.resolve(BASE_DIR, '../update-36/ut.lang.txt');
const FILE_PATH = path.resolve(__dirname, '../csv/en.lang.csv');

const CSV_BASE_PATTERN = `"(?<key>\\d+-\\d+-\\d+)"(,|;)"(?<value>([\\w\\W\\s\\n$&+,:;=?@#|'<>.^*\\-()%!"])*?)"`;
const CSV_KEY_PATTERN = new RegExp(CSV_BASE_PATTERN);
const CSV_PATTERN_FOR_UPDATE = new RegExp(CSV_BASE_PATTERN + '(,|;)""');

const CSV = {
  patternForUpdate: CSV_PATTERN_FOR_UPDATE,
  keyPattern: CSV_KEY_PATTERN,
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
