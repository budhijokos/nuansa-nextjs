const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPath = path.join(__dirname, 'src/assets/images/logo-nuansa/logo-nuansa.webp');
const publicDir = path.join(__dirname, 'public');

async function convert() {
  try {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // 1. Copy webp logo to public
    fs.copyFileSync(srcPath, path.join(publicDir, 'logo-nuansa.webp'));
    console.log('Copied logo-nuansa.webp to public/');

    // 2. Convert webp to png
    await sharp(srcPath)
      .png()
      .toFile(path.join(publicDir, 'logo-nuansa.png'));
    console.log('Converted and saved logo-nuansa.png to public/');

    // 3. Convert webp to jpg
    await sharp(srcPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // white background for jpg
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'logo-nuansa.jpg'));
    console.log('Converted and saved logo-nuansa.jpg to public/');

    // 4. Create favicon.ico from png
    await sharp(srcPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Created favicon.ico in public/');
    
  } catch (error) {
    console.error('Error during image conversion:', error);
    process.exit(1);
  }
}

convert();
