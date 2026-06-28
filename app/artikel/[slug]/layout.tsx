import { Metadata } from 'next';
import { MIND_ARTICLES } from '@/lib/constants';
import bannerImage from "@/src/assets/images/logo-nuansa/banner/banner-nuansa.png";
import bannerImage2 from "@/src/assets/images/logo-nuansa/banner/banner-nuansa.jpeg";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = MIND_ARTICLES.find((a) => a.slug === slug);
  
  if (!article) {
    return {
      title: 'Artikel Kesehatan Mental | Nuansa Psychology Consulting',
      description: 'Layanan konseling profesional & terpercaya di Tangerang oleh PT Nuansa Daya Persada.',
    };
  }

  const title = `${article.title} | Nuansa Psychology Consulting`;
  const description = article.excerpt || 'Layanan konseling profesional & terpercaya di Tangerang oleh PT Nuansa Daya Persada.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nuansaconsulting.com/artikel/${slug}`,
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
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{
        url: bannerImage.src,
        width: 1200,
        height: 630,
        alt: "Nuansa Psychology Consulting - Layanan Konseling Psikologi Tangerang",
      }],
    },
    alternates: {
      canonical: `https://nuansaconsulting.com/artikel/${slug}`,
    }
  };
}

export default function ArticleDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
