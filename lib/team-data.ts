import { StaticImageData } from "next/image";
import imgSanti from "@/src/assets/images/tim-nuansa/santi.webp";
import imgWahyu from "@/src/assets/images/tim-nuansa/wahyu.webp";
import imgIvan from "@/src/assets/images/tim-nuansa/ivan-ken.webp";
import imgFarida from "@/src/assets/images/tim-nuansa/farida-syahrani.webp";
import imgSiti from "@/src/assets/images/tim-nuansa/siti.webp";
import imgSenja from "@/src/assets/images/tim-nuansa/senja.webp";

export interface TeamMember {
  name: string;
  role: string;
  imageSrc: StaticImageData;
  description: string;
  tag1: string;
  tag2: string;
  hasSipp: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Santi Meliyanti",
    role: "Psikolog & Senior Trainer (Pendiri)",
    imageSrc: imgSanti,
    description: "Menata fondasi Nuansa sejak 2006. Memiliki spesialisasi penanganan trauma psikologis, tumbuh kembang anak istimewa (ABK), dinamika komunikasi keluarga, serta modul outbound perusahaan berskala luas.",
    tag1: "Praktik Tangerang CIMONE",
    tag2: "HIMPSI Terdaftar",
    hasSipp: true,
  },
  {
    name: "Wahyu Musyukal",
    role: "Trainer Senior SDM",
    imageSrc: imgWahyu,
    description: "Fokus pada pembekalan masa persiapan pensiun (MPP) karyawan, program outbound korporat, peningkatan kapasitas manajemen tim, serta asisten psikoedukasi kelompok.",
    tag1: "Modul Keorganisasian",
    tag2: "PT. Nuansa Daya",
    hasSipp: false,
  },
  {
    name: "Ivan Ken Martanto",
    role: "Psikolog & Instruktur Trainer",
    imageSrc: imgIvan,
    description: "Ahli di bidang asesmen minat-bakat anak, psikotes klasikal untuk seleksi instansi pendidikan, tes kompetensi promosi jabatan, serta modifikasi perilaku remaja.",
    tag1: "Layanan Pendidikan",
    tag2: "HIMPSI Terdaftar",
    hasSipp: true,
  },
  {
    name: "Farida Syahrani",
    role: "Psikolog & Pemateri Pendidikan",
    imageSrc: imgFarida,
    description: "Menangani asisten bimbingan konseling tumbuh kembang anak istimewa (ABK), psikologi transisi remaja menghadapi pubertas, serta konsultansi kematangan psikis.",
    tag1: "Klinis & Keluarga",
    tag2: "SIPP Aktif",
    hasSipp: true,
  },
  {
    name: "Siti Syarah",
    role: "Psikolog & Konseling Individu",
    imageSrc: imgSiti,
    description: "Memberikan panduan emosi klinis untuk menekan tingkat stress kronis karyawan, pemulihan mental usia produktif, serta psikoedukasi manajemen krisis.",
    tag1: "Layanan Dewasa",
    tag2: "SIPP Aktif",
    hasSipp: true,
  },
  {
    name: "Senja Kurnia Putri",
    role: "Psikolog & Trainer Pendidikan",
    imageSrc: imgSenja,
    description: "Berfokus pada penyelesaian konflik keluarga, mediasi perceraian, asisten terapi kognitif siswa berprestasi, serta perbaikan pola interaksi anak-orang tua.",
    tag1: "Asesmen Individual",
    tag2: "HIMPSI Terdaftar",
    hasSipp: true,
  }
];
