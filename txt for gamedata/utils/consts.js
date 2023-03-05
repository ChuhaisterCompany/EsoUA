const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');
const TXT_FILE_PATH = path.resolve(BASE_DIR, '../update-36/ut.lang.txt');
const CSV_DIR = path.resolve(BASE_DIR, 'csv');
const CSV_INPUT_FILE_PATH = path.resolve(CSV_DIR, 'en.lang.csv');
const CSV_OUTPUT_FILE_PATH = path.resolve(CSV_DIR, 'new.en.lang.csv');

const KEY_PATTERN = '\\d+-\\d+-\\d+';
const VALUE_PATTERN = `([\\w\\W\\s\\n$&+,:;=?@#|'<>.^*\\-()%!"])*`;
const VALUE_PATTERN_LAZY = `([\\w\\W\\s\\n$&+,:;=?@#|'<>.^*\\-()%!"])*?`;

const generatePattern = (valueP, ...rest) =>
  new RegExp(`"(?<key>${KEY_PATTERN})"(,|;)"(?<value>${valueP})${rest.join('')}`);

const CSV_KEY_PATTERN = generatePattern(VALUE_PATTERN);
const CSV_PATTERN_FOR_UPDATE = generatePattern(VALUE_PATTERN_LAZY + '(,|;)""');

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
  CSV_DIR,
  CSV_INPUT_FILE_PATH,
  CSV_OUTPUT_FILE_PATH,
  TXT,
  TXT_FILE_PATH,
};
