const fs = require('fs');

const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

const importSharedStatement = `import {
  reservationSchema,
  ReservationData,
  FormErrors,
  CustomCursor,
  ReadingProgress,
  MagneticButton,
  SIPPBadge,
  QuoteBackground,
  AnimatedCheckmark,
  RatingStars,
  StaggeredBadge,
  Skeleton,
  LoadingCylinder,
  HistoryTimeline,
  GlassIcon,
  RollingNumber,
  BestValueBadge,
  ScrollReveal,
  TiltCard,
  TiltCardProps,
  COMPLAINT_GUIDELINES,
  renderComplaintIcon
} from "@/components/shared-ui";
import { Footer } from "@/components/sections/Footer";
`;

// Looking for the start of `const reservationSchema` (line 59/60)
const startIndex = lines.findIndex(line => line.includes('const reservationSchema = z.object({'));
// Looking for `export default function Home()`
const endIndex = lines.findIndex(line => line.includes('export default function Home() {'));

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex - 1, endIndex - startIndex, importSharedStatement);
  fs.writeFileSync('app/page.tsx', lines.join('\n'));
  console.log("Successfully replaced lines " + startIndex + " to " + endIndex + " with imports.");
} else {
  console.log("Could not find start or end index.", { startIndex, endIndex });
}
