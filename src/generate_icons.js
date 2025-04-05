const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];
const inputImage = path.join(__dirname, '../assets/logo.svg');
const outputDir = path.join(__dirname, '../icons');

// Ensure the icons directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons for each size
async function generateIcons() {
  for (const size of sizes) {
    try {
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDir, `icon${size}.png`));
      console.log(`Generated ${size}x${size} icon`);
    } catch (err) {
      console.error(`Error generating ${size}x${size} icon:`, err);
    }
  }
}

generateIcons(); 