const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Promotional image sizes required by Chrome Web Store
const sizes = [
  { width: 440, height: 280, name: 'small_promo', screenshotScale: 0.5 },
  { width: 920, height: 680, name: 'large_promo', screenshotScale: 1 },
  { width: 1400, height: 560, name: 'marquee_promo', screenshotScale: 1 }
];

const inputImage = path.join(__dirname, '../assets/store-promo.svg');
const screenshotImage = path.join(__dirname, '../assets/screenshot.png');
const outputDir = path.join(__dirname, '../promo');

// Ensure the promo directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate promotional images for each size
async function generatePromos() {
  for (const size of sizes) {
    try {
      // Prepare the screenshot overlay with appropriate scaling
      const screenshotWidth = Math.round(480 * size.screenshotScale);
      const screenshotHeight = Math.round(340 * size.screenshotScale);
      
      const screenshot = await sharp(screenshotImage)
        .resize(screenshotWidth, screenshotHeight, {
          fit: 'contain',
          background: { r: 245, g: 245, b: 245, alpha: 1 }
        })
        .toBuffer();

      // Create the base image from SVG
      const baseImage = await sharp(inputImage)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toBuffer();

      // Calculate screenshot position (centered in the right section frame)
      const screenshotX = Math.round((size.width / 1400) * 810);
      const screenshotY = Math.round((size.height / 560) * 110);

      // Composite the screenshot onto the base image
      await sharp(baseImage)
        .composite([
          {
            input: screenshot,
            top: screenshotY,
            left: screenshotX
          }
        ])
        .png()
        .toFile(path.join(outputDir, `${size.name}.png`));

      console.log(`Generated ${size.name} (${size.width}x${size.height})`);
    } catch (err) {
      console.error(`Error generating ${size.name}:`, err);
    }
  }
}

generatePromos(); 