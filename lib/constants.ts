import { Article } from "@/types/article";
import { LucideIcon, Brain, FileText, Briefcase, Heart } from "lucide-react";

export interface ServiceDetailItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  features: string[];
  color: "emerald" | "stone" | "amber";
  metaBox: {
    title: string;
    type: "list" | "text";
    pricingList?: { label: string; price: string }[];
    shortDesc?: string;
    ctaText: string;
    ctaHref: string;
    ctaExternal?: boolean;
    note?: string;
  };
}

export const SERVICES_DATABASE: ServiceDetailItem[] = [
  {
    id: "konseling",
    label: "Konseling & Terapi",
    icon: Brain,
    badge: "Konseling & Pendampingan",
    title: "Menjaga Kesehatan Mentalmu",
    description: "Layanan konseling kami hadir sebagai ruang aman buatmu. Psikolog berlisensi kami akan menemanimu dengan hangat dan menjaga kerahasiaan ceritamu sepenuhnya. Kami siap mendengarkan apa pun yang sedang kamu rasakan.",
    features: [
      "Konseling Remaja & Akademik",
      "Konseling Keluarga & Pasangan",
      "Tumbuh Kembang Anak",
      "Trauma Healing Khusus"
    ],
    color: "emerald",
    metaBox: {
      title: "Informasi Biaya",
      type: "list",
      pricingList: [
        { label: "Konseling Online (45-90 Menit):", price: "Rp 150.000 / sesi" },
        { label: "Konseling Offline (1-2 Jam Tatap Muka):", price: "Rp 250.000 / sesi" }
      ],
      ctaText: "Daftar Konseling via Formulir Reservasi",
      ctaHref: "/reservasi"
    }
  },
  {
    id: "tes",
    label: "Tes Psikologi",
    icon: FileText,
    badge: "Asesmen & Tes Psikologi",
    title: "Mengenali Potensi Diri Lebih Dalam",
    description: "Pahami dirimu lebih dalam melalui tes yang akurat. Kami bantu kamu mengenali bakat, minat, hingga potensi terpendam untuk melangkah lebih mantap di masa depan.",
    features: [
      "Tes IQ & Penelusuran Bakat Minat",
      "Penjurusan Sekolah & Universitas",
      "Asesmen ABK (Anak Istimewa)",
      "Rekrutmen & Evaluasi Jabatan"
    ],
    color: "stone",
    metaBox: {
      title: "Informasi Biaya",
      type: "list",
      pricingList: [
        { label: "Tes Psikologi Individual:", price: "Rp 250.000 - Rp 600.000 / orang" },
        { label: "Tes Klasikal (Min. 20 Orang):", price: "Rp 125.000 - Rp 350.000 / orang" }
      ],
      ctaText: "Daftar Tes via Formulir Reservasi",
      ctaHref: "/reservasi",
      note: "* Harga bervariasi bergantung kedalaman alat tes yang diambil (WISC, Stanford-Binet, DISC, dll)."
    }
  },
  {
    id: "training",
    label: "Training & Outbound",
    icon: Briefcase,
    badge: "Pelatihan & Pengembangan",
    title: "Mendukung Tim Kerja yang Hebat",
    description: "Belajar jadi lebih seru dengan metode interaktif kami! Kami hadir untuk membantumu meningkatkan kemampuan diri, mengelola stres di tempat kerja, hingga mempersiapkan masa pensiun dengan lebih tenang.",
    features: [
      "Pelatihan Pubertas & Seks Edukasi",
      "Outbound Kelompok & Team Building",
      "Peningkatan Kapasitas Karyawan",
      "Masa Persiapan Pensiun (MPP)"
    ],
    color: "emerald",
    metaBox: {
      title: "Skema Kerjasama",
      type: "text",
      shortDesc: "Kami meluncurkan program training anak & remaja mulai dari Rp 100.000 / peserta dengan ketentuan minimal peserta tertentu. Silakan hitung perkiraan biayamu menggunakan kalkulator interaktif kami di bawah, atau langsung ajukan brosur proposal via email.",
      ctaText: "Coba Simulator Biaya Pelatihan",
      ctaHref: "#biaya"
    }
  },
  {
    id: "parenting",
    label: "Edukasi Parenting",
    icon: Heart,
    badge: "Seminar & Workshop",
    title: "Membangun Keluarga yang Harmonis",
    description: "Menjadi orang tua itu menantang, tapi kamu tidak sendirian. Kami hadir dengan seminar dan diskusi santai untuk membantumu membimbing buah hati dan membangun komunikasi yang harmonis dalam keluarga.",
    features: [
      "Consultancy Balita & Remaja",
      "Webinar Edukasi Parenting",
      "Focus Group Discussion (FGD)",
      "Modul Pembekalan Pengasuh"
    ],
    color: "amber",
    metaBox: {
      title: "Kelas & Sertifikat Parenting",
      type: "text",
      shortDesc: "Kami rutin mengadakan seminar keluarga berkelompok dengan biaya tiket terjangkau dan penyediaan laporan perkembangan minat bimbingan anak demi mencapai tumbuh kembang optimal.",
      ctaText: "Tanyakan Info Seminar Terdekat via WhatsApp",
      ctaHref: "https://wa.me/628128453550",
      ctaExternal: true
    }
  }
];

export const SITE_METADATA = {
  name: "Nuansa Psychology Consulting",
  fullName: "Nuansa Psychology Consulting - SIPP Berlisensi HIMPSI",
  tagline: "Sahabat Cerita, Mitra Tumbuh",
  foundedYear: 2006,
  address: "Jl. Proklamasi No 34, Cimone, Karawaci, Tangerang, 15114",
  phone: "+62 812 8453 550",
  email: "layanan@nuansaconsulting.com",
  openingHours: "Senin - Jumat, pukul 09.00 - 16.00 WIB",
  socials: {
    whatsapp: "https://wa.me/628128453550",
    instagram: "https://instagram.com/nuansapsychology",
    facebook: "https://facebook.com/nuansapsychology",
  }
};

export const NAVIGATION_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/#layanan" },
  { label: "Tentang Kami", href: "/#about" },
  { label: "Pencapaian", href: "/#pencapaian" },
  { label: "Tim Ahli", href: "/#tim" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontak", href: "/#contact" },
];

export const MIND_ARTICLES: Article[] = [
  {
    slug: "mengelola-burnout-tekanan-kerja",
    title: "Mengelola Burnout & Tekanan Kerja",
    category: "Produktivitas",
    excerpt: "Kenali tanda-tanda kelelahan ekstrem dan cara mengatasinya dengan teknik jeda mikro yang efektif.",
    readTime: "5",
    date: "2024-05-15",
    imageSeed: "burnout"
  },
  {
    slug: "komunikasi-asertif-keluarga",
    title: "Seni Komunikasi Asertif dalam Keluarga",
    category: "Relasi",
    excerpt: "Membangun keintiman lewat kejujuran. Cara menyampaikan perasaan tanpa harus menyakiti orang tercinta.",
    readTime: "6",
    date: "2024-05-12",
    imageSeed: "family"
  },
  {
    slug: "menghargai-emosi-negatif",
    title: "Mengapa Kita Perlu Menghargai Emosi Negatif",
    category: "Mental Health",
    excerpt: "Setiap emosi membawa pesan. Belajar merangkul sedih dan marah sebagai bagian utuh dari kemanusiaan kita.",
    readTime: "4",
    date: "2024-05-10",
    imageSeed: "emotions"
  },
  {
    slug: "membangun-boundaries-sehat",
    title: "Membangun Boundaries (Batasan) yang Sehat",
    category: "Self Growth",
    excerpt: "Menjaga integritas diri dengan berani berkata tidak. Pentingnya pagar emosional demi kesehatan batin.",
    readTime: "5",
    date: "2024-05-08",
    imageSeed: "boundaries"
  },
  {
    slug: "psikologi-pola-asuh-positif",
    title: "Psikologi Pola Asuh: Membimbing Tanpa Menghakimi",
    category: "Parenting",
    excerpt: "Memahami neurobiologi anak di balik tantrum dan cara membimbing mereka dengan empati yang mendalam.",
    readTime: "7",
    date: "2024-05-05",
    imageSeed: "parenting"
  },
  {
    slug: "memutus-rantai-overthinking",
    title: "Strategi Praktis Memutus Rantai Overthinking",
    category: "Mental Health",
    excerpt: "Hentikan pusaran pikiran negatif yang melumpuhkan. Temukan kembali kendali atas fokus dan ketenanganmu.",
    readTime: "6",
    date: "2024-05-01",
    imageSeed: "overthinking"
  },
  {
    slug: "meditasi-lima-menit",
    title: "Meditasi Lima Menit: Ketenangan di Sela Kesibukan",
    category: "Self Care",
    excerpt: "Tidak butuh waktu lama untuk tenang. Latihan mindfulness sederhana yang bisa dilakukan di mana saja.",
    readTime: "5",
    date: "2024-04-28",
    imageSeed: "meditation"
  },
  {
    slug: "tidur-dan-stabilitas-emosi",
    title: "Korelasi Kualitas Tidur dengan Stabilitas Emosi",
    category: "Mental Health",
    excerpt: "Bagaimana istirahat yang cukup menjadi fondasi utama bagi kesehatan mental dan regulasi emosi harian.",
    readTime: "5",
    date: "2024-04-25",
    imageSeed: "sleep"
  }
];
