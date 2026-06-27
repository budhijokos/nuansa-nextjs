import { Metadata } from 'next';

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
        url: '/banner-nuansa.png',
        width: 800,
        height: 800,
        alt: 'Nuansa Psychology Consulting - Layanan Konseling Psikologi Tangerang',
      },
      {
        url: '/banner-nuansa.jpeg',
        width: 800,
        height: 800,
        alt: 'Nuansa Psychology Consulting - Layanan Konseling Psikologi Tangerang',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel Kesehatan Mental & Hubungan | Nuansa Psychology Consulting',
    description: 'Wawasan psikologi mendalam, panduan regulasi emosi, meditasi mindfulness, pola asuh anak, dan tip hubungan harmonis dari tim psikolog profesional Nuansa.',
    images: ['/banner-nuansa.png'],
  },
  alternates: {
    canonical: 'https://nuansaconsulting.com/artikel',
  }
};

export default function ArtikelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
