// backend/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to generate a dynamic upload folder based on the component type
const generateDynamicUploadFolder = (componentType) => {
  const componentFolder = `uploads/${componentType}`;
  let fullUploadPath = path.join(__dirname, componentFolder);
  // fullUploadPath = fullUploadPath.replace(/\\/g, '/');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(fullUploadPath)) {
    fs.mkdirSync(fullUploadPath, { recursive: true });
  }

  // console.log(`Upload folder: ${componentFolder}`)
  return componentFolder;
};

// Multer configuration
const multerConfig = (componentType) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        console.log('here')
        const uploadFolder = generateDynamicUploadFolder(componentType);
        return cb(null, uploadFolder);
      },
      filename: (req, file, cb) => {
        return cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
  });
};

module.exports = { multerConfig, generateDynamicUploadFolder };
