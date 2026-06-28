const fs = require('fs');

const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

const importAboutUs = `import { AboutUs } from "@/components/sections/AboutUs";\n`;

// Add import
const firstImportIndex = lines.findIndex(line => line.startsWith('import '));
lines.splice(firstImportIndex, 0, importAboutUs);

// Remove the section
const startComment = '{/* 2. Profile & Tentang Kami (Visi Misi Santi Meliyanti) */}';
const endComment = '{/* 3. 4 Pilar Layanan Psikologi (Dynamic Tab System) */}';
let startIndex = lines.findIndex(line => line.includes(startComment));
let endIndex = lines.findIndex(line => line.includes(endComment));

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex, `      {/* 2. Profile & Tentang Kami (Visi Misi Santi Meliyanti) */}\n      <AboutUs />\n`);
  fs.writeFileSync('app/page.tsx', lines.join('\n'));
  console.log("Successfully replaced AboutUs.");
} else {
  console.log("Could not find start or end index for AboutUs.", { startIndex, endIndex });
}
