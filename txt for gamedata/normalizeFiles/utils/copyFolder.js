const fs = require('fs/promises');
const path = require('path');

/**
 * Copies a folder from the source path to the destination path.
 * @param {string} source - The path of the source folder to be copied.
 * @param {string} destination - The path of the destination folder where the source folder will be copied to.
 * @returns {Promise<void>} - A promise that resolves when the folder is successfully copied or rejects with an error.
 */
const copyFolder = async (source, destination) => {
  try {
    await fs.cp(source, destination, { recursive: true });

    console.log('Folder copied successfully!');
  } catch (err) {
    console.error('Error copying folder:', err);
  }
};

module.exports = copyFolder;
