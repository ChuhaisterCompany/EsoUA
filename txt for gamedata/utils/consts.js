const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');
const FILE_PATH = path.resolve(BASE_DIR, 'update-36', 'ut.lang.txt');

const TXT_OUTPUT_DIR = 'txt_ids';
const CSV_OUTPUT_DIR = 'csv_ids';

const KEY_PATTERN = /(\{?\{?(?<key>\d+-\d+-\d+):?\}?\}?) ?(?<value>.+)/;

module.exports = {
  BASE_DIR,
  CSV_OUTPUT_DIR,
  FILE_PATH,
  KEY_PATTERN,
  TXT_OUTPUT_DIR,
};
