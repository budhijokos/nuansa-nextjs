import { Metadata } from 'next';
import bannerImage from "@/src/assets/images/logo-nuansa/banner/banner-nuansa.png";
import bannerImage2 from "@/src/assets/images/logo-nuansa/banner/banner-nuansa.jpeg";

export const metadata: Metadata = {
  title: 'Artikel Kesehatan Mental & Hubungan | Nuansa Psychology Consulting',
  description: 'Wawasan psikologi mendalam, panduan regulasi emosi, meditasi mindfulness, pola asuh anak, dan tip hubungan harmonis dari tim psikolog profesional Nuansa.',
  openGraph: {
    title: 'Artikel Kesehatan Mental & Hubungan | Nuansa Psychology Consulting',
    description: 'Wawasan psikologi mendalam, panduan regulasi emosi, meditasi mindfulness, pola asuh anak, dan tip hubungan harmonis dari tim psikolog profesional Nuansa.',
    url: 'https://nuansaconsulting.com/artikel',
    siteName: 'Nuansa Psychology Consulting',
    images: [
      {
        url: bannerImage.src,
        width: 1200,
        height: 630,
        alt: "Nuansa Psychology Consulting - Layanan Konseling Psikologi Tangerang",
      },
      {
        url: bannerImage2.src,
        width: 1200,
        height: 630,
        alt: "Nuansa Psychology Consulting - Layanan Konseling Psikologi Tangerang",
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel Kesehatan Mental & Hubungan | Nuansa Psychology Consulting',
    description: 'Wawasan psikologi mendalam, panduan regulasi emosi, meditasi mindfulness, pola asuh anak, dan tip hubungan harmonis dari tim psikolog profesional Nuansa.',
    images: [ {
        url: bannerImage.src,
        width: 1200,
        height: 630,
        alt: "Nuansa Psychology Consulting - Layanan Konseling Psikologi Tangerang",
      }],
  },
  alternates: {
    canonical: 'https://nuansaconsulting.com/artikel',
  }
};

export default function ArtikelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
