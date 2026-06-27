import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir Reservasi Jadwal & Janji Temu | Nuansa Psychology Consulting",
  description: "Daftarkan janji temu sesi konseling psikologi, layanan tes IQ/bakat minat perorangan maupun kelompok, serta konsultasi tumbuh kembang anak secara mudah di bawah jaminan kerahasiaan HIMPSI.",
  keywords: [
    "Reservasi Psikolog Tangerang",
    "Booking Konseling",
    "Daftar Tes IQ",
    "Janji Temu Psikolog",
    "Nuansa Psychology Consulting",
    "Psikolog Karawaci",
    "Tes Minat Bakat Tangerang",
    "Tumbuh Kembang Anak Tangerang"
  ],
  alternates: {
    canonical: "https://nuansaconsulting.com/reservasi",
  },
  openGraph: {
    title: "Formulir Reservasi Jadwal & Janji Temu | Nuansa Psychology Consulting",
    description: "Daftarkan janji temu sesi konseling psikologi, layanan tes IQ/bakat minat perorangan maupun kelompok, serta konsultasi tumbuh kembang anak secara mudah di bawah jaminan kerahasiaan HIMPSI.",
    url: "https://nuansaconsulting.com/reservasi",
    siteName: "Nuansa Psychology Consulting",
    images: [
      {
        url: "/banner-nuansa.png",
        width: 800,
        height: 800,
        alt: "Nuansa Psychology Consulting Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formulir Reservasi Jadwal & Janji Temu | Nuansa Psychology Consulting",
    description: "Daftarkan janji temu sesi konseling psikologi, layanan tes IQ/bakat minat perorangan maupun kelompok, serta konsultasi tumbuh kembang anak secara mudah di bawah jaminan kerahasiaan HIMPSI.",
    images: ["/banner-nuansa.png"],
  },
};

export default function ReservasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
