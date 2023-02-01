const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');

// const FILE_PATH = path.resolve(BASE_DIR, '../update-36/ut.lang.txt');
const FILE_PATH = path.resolve(__dirname, '../csv/en.lang.csv');

const CSV = {
  keyPattern: /(?<key>\d+-\d+-\d+)"(,|;)"(?<value>\w+)/,
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
