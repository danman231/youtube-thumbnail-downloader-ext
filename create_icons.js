const fs = require('fs');
const path = require('path');

// Basic 1x1 transparent PNG file (hex data)
const transparentPixelPNG = Buffer.from(
  '89504E470D0A1A0A0000000D4948445200000001000000010804000000B51C0C020000000B4944415478DA636000000001000105000000', 
  'hex'
);

// Icons to create with their sizes
const icons = [
  { name: 'icon16.png', size: 16 },
  { name: 'icon48.png', size: 48 },
  { name: 'icon128.png', size: 128 }
];

// Create each icon file
icons.forEach(icon => {
  const filePath = path.join(__dirname, 'icons', icon.name);
  fs.writeFileSync(filePath, transparentPixelPNG);
  console.log(`Created: ${icon.name} (placeholder)`);
});

console.log('All placeholder icons created successfully.'); 