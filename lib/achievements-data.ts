import { User, Briefcase, Building, Award } from "lucide-react";

export const STATS_CONFIG = [
  {
    key: "perorangan",
    target: 1230,
    label: "Klien Perorangan",
    desc: "Sesi konseling tatap muka klinis & online, penanganan trauma, hingga bimbingan bakat individu.",
    icon: User,
    simLabel: "+1 Klien!",
  },
  {
    key: "training",
    target: 200,
    label: "Kelas Training",
    desc: "Workshop anti-bullying sekolah, outbound remaja, hingga motivasi karyawan korporat.",
    icon: Briefcase,
    simLabel: "+1 Kelas!",
  },
  {
    key: "lembaga",
    target: 30,
    label: "Klien Lembaga",
    desc: "Bekerja sama dengan puluhan yayasan, sekolah Islam Terpadu, SKH khusus, dan instansi formal.",
    icon: Building,
    simLabel: "+1 Lembaga!",
  },
  {
    key: "pengalaman",
    target: new Date().getFullYear() - 2006,
    label: "Tahun Pengalaman",
    desc: "Eksistensi konsisten melayani bimbingan psikologi terpercaya sejak dirintis tahun 2006.",
    icon: Award,
    simLabel: "+1 Tahun!",
  },
];
