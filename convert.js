const cr2Raw = require('cr2-raw');
const fs = require('fs');
const path = require('path');

const convert = async (source, destination) => {
  try {
    const raw = cr2Raw(source);
    fs.writeFileSync(destination, raw.previewImage());
  } catch (error) {
    console.error(`Error converting file ${source}:`, error);
  }
};

const convertAllFiles = async (sourceFolder, destinationFolder) => {
  try {
    const files = await fs.promises.readdir(sourceFolder);
    const convertPromises = files.map(async (file) => {
      const source = path.join(sourceFolder, file);
      const destination = path.join(destinationFolder, file.replace('.CR2', '.jpg'));
      await convert(source, destination);
    });
    await Promise.all(convertPromises);
    console.log('All files converted successfully.');
  } catch (error) {
    console.error('Error reading directory:', error);
  }
};

const sourceFolder = './CR2';
const destinationFolder = './JPG';

convertAllFiles(sourceFolder, destinationFolder);