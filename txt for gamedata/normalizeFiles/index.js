const path = require('path');
const { concatCSV, copyFolder, updateCSVFiles } = require('./utils');

const source = path.resolve(__dirname, './Файли гри');
const destination = path.resolve(__dirname, './Файли гри 2');
const mainDataPath = path.resolve(__dirname, './en.lang.csv');
const concatinatedCSVPath = path.resolve(destination, './en-2.lang.csv');

(async () => {
  try {
    await copyFolder(source, destination);
    await updateCSVFiles(destination, mainDataPath);
    await concatCSV(destination, concatinatedCSVPath);

    console.log('All operations completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
})();
