const fs = require('fs');

const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

const importTeamSection = `import { TeamSection } from "@/components/sections/TeamSection";\n`;

// Add import
const firstImportIndex = lines.findIndex(line => line.startsWith('import '));
lines.splice(firstImportIndex, 0, importTeamSection);

// Remove the Team section
const startComment = '{/* 6. Professional Team Section (Updated UI) */}';
const endComment = '{/* 7. Testimonials & Trusted Clients (Real Institutions) */}';
let startIndex = lines.findIndex(line => line.includes('<section id="team"'));
// Need to adjust start index to include the comment before it, if we matched the section
if (startIndex !== -1 && lines[startIndex-1].includes('6.')) {
    startIndex = startIndex - 1;
}

let endIndex = lines.findIndex(line => line.includes(endComment));

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex, `      {/* 6. Professional Team Section (Updated UI) */}\n      <TeamSection />\n\n`);
  fs.writeFileSync('app/page.tsx', lines.join('\n'));
  console.log("Successfully replaced TeamSection.");
} else {
  console.log("Could not find start or end index for TeamSection.", { startIndex, endIndex });
}
