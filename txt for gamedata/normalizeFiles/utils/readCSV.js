const fs = require('fs');
const readline = require('readline');

/**
 * Wraps a string in quotes if it is not already wrapped.
 *
 * @param {string} str - The string to wrap in quotes.
 * @returns {string} The wrapped string.
 */
const wrapInQuotes = (str) => {
  let wrappedStr = str;

  if (!str.startsWith('"')) {
    wrappedStr = `"${wrappedStr}`;
  }

  if (!str.endsWith('"')) {
    wrappedStr = `${wrappedStr}"`;
  }

  return wrappedStr;
};

/**
 * Parses a CSV line and returns an array of data.
 *
 * @param {string} line - The CSV line to parse.
 * @returns {string[]} An array of data parsed from the CSV line.
 */
const parseCSVLine = (line) => {
  const data = line.split(/"[;,]"/);

  return data.map(wrapInQuotes);
};

/**
 * Reads a CSV file and returns its contents as an array of arrays.
 * Each inner array represents a row in the CSV file, with each element
 * representing a column value.
 *
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<Array<Array<string>>>} A promise that resolves to an array of arrays representing the CSV data.
 * @throws {Error} If there is an error reading the CSV file.
 */
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      const data = parseCSVLine(line);

      results.push(data);
    });

    rl.on('close', () => {
      resolve(results);
    });

    fileStream.on('error', (error) => {
      reject(error);
    });
  });
};

module.exports = readCSV;
