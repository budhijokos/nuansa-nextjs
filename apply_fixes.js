const fs = require('fs');

const content = fs.readFileSync('app/page.tsx', 'utf8');
let lines = content.split('\n');

// 1. Fix Email Aktif label
const emailLabelIndex = lines.findIndex(line => line.includes('<label className="text-xs font-bold text-stone-700 block">Email Aktif</label>'));
if (emailLabelIndex !== -1) {
  lines[emailLabelIndex] = lines[emailLabelIndex].replace('Email Aktif', 'Email Aktif (Opsional)');
}

// 2. Fix WhatsApp Open Logic (from window.open to window.location.href)
const waOpenIndex = lines.findIndex(line => line.includes('window.open(waUrl, "_blank", "noopener,noreferrer");'));
if (waOpenIndex !== -1) {
  lines[waOpenIndex] = '    window.location.href = waUrl;';
}
// there might be a second one for form submission:
const waOpenIndex2 = lines.findIndex(line => line.includes('window.open(waUrl, "_blank", "noopener,noreferrer");'));
if (waOpenIndex2 !== -1) {
  lines[waOpenIndex2] = '    window.location.href = waUrl;';
}

// 3. Fix Map iframe query
const iframeIndex = lines.findIndex(line => line.includes('src="https://maps.google.com/maps?q=PT.+Nuansa+Daya+Persada,+Jl.+Proklamasi+No+34,+Cimone,+Karawaci,+Tangerang&t=&z=16&ie=UTF8&iwloc=&output=embed"'));
if (iframeIndex !== -1) {
  lines[iframeIndex] = '                    src="https://maps.google.com/maps?q=Nuansa+Psychology+Consulting,+Bugel,+Kec.+Karawaci,+Kota+Tangerang&t=&z=16&ie=UTF8&iwloc=&output=embed"';
}

// Write the lines back
fs.writeFileSync('app/page.tsx', lines.join('\n'));
console.log("Applied custom text/map fixes.");
