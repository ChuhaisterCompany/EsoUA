const fs = require('fs');

/**
 * Converts a 2D array of data into a CSV string.
 *
 * @param {Array<Array<string>>} data - The 2D array of data to convert.
 * @param {string} [separator=','] - The separator to use between values in the CSV string. Default is ','.
 * @returns {string} The CSV string representation of the data.
 */
const convertToCSV = (data, separator = ',') => {
  const csvData = data.map((row) => row.join(separator)).join('\r\n');

  return csvData;
};

/**
 * Writes data to a CSV file.
 *
 * @param {string} filename - The name of the CSV file to write.
 * @param {Array<Array<string>>} data - The data to be written to the CSV file.
 * @param {string} [separator=','] - The separator to use between values in the CSV string. Default is ','.
 * @returns {Promise<void>} A promise that resolves when the CSV file is written successfully.
 */
const writeCSV = (filename, data, separator) => {
  return new Promise((resolve, reject) => {
    const csv = convertToCSV(data, separator);

    const writeStream = fs.createWriteStream(filename);
    writeStream.write(csv);
    writeStream.end();

    writeStream.on('finish', () => {
      console.log('CSV file written successfully! Path:', filename);
      resolve();
    });

    writeStream.on('error', (err) => {
      console.error('Error writing CSV file:', err);
      reject(err);
    });
  });
};

module.exports = writeCSV;
