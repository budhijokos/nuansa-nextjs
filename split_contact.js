const fs = require('fs');

const content = fs.readFileSync('app/page.tsx', 'utf8');
let lines = content.split('\n');

const hooksIdxStart = lines.findIndex(l => l.includes('const [formData, setFormData] = useState({'));
const hooksIdxEnd = lines.findIndex(l => l.includes('} catch (err) {')) + 21; // to capture "};" closing

const hooks = lines.slice(hooksIdxStart, hooksIdxEnd).join('\n');

const jsxStart = lines.findIndex(l => l.includes('{/* 9. SEO Optimized Responsif Contact & Reservation Form */}'));
const jsxEnd = lines.findIndex((l, i) => i > jsxStart && l.includes('</section>'));

const jsxCode = lines.slice(jsxStart + 1, jsxEnd + 1).join('\n');

const componentText = `"use client";
import React, { useState } from "react";
import * as z from "zod";
import confetti from "canvas-confetti";
import { Mail, MapPin, Phone, Clock, ShieldAlert, ArrowRight, Loader2, Info } from "lucide-react";
import { ScrollReveal, FormErrors, reservationSchema, ReservationData } from "@/components/shared-ui";

export function ContactSection() {
${hooks}

  return (
${jsxCode}
  );
}
`;

fs.writeFileSync('components/sections/ContactSection.tsx', componentText);

// Re-write page.tsx
const importText = `import { ContactSection } from "@/components/sections/ContactSection";`;
const importIdx = lines.findIndex(l => l.startsWith('import '));
lines.splice(importIdx, 0, importText);

let diff = hooksIdxEnd - hooksIdxStart;
lines.splice(hooksIdxStart + 1, diff);

const actualJsxStart = jsxStart + 1 - diff;
const actualJsxEnd = jsxEnd + 1 - diff;

lines.splice(actualJsxStart, actualJsxEnd - actualJsxStart + 1, `      {/* 9. SEO Optimized Responsif Contact & Reservation Form */}\n      <ContactSection />`);

fs.writeFileSync('app/page.tsx', lines.join('\n'));
console.log('Successfully extracted ContactSection');
