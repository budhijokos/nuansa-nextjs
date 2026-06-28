import { Metadata } from "next";
import bannerImage from "@/src/assets/images/logo-nuansa/banner/banner-nuansa.png";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nuansaconsulting.com";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Konseling Psikologi Tangerang | Nuansa Psychology Consulting",
  description:
    "Biro psikologi & jurnalisme kesehatan mental tepercaya di Tangerang oleh PT Nuansa Daya Persada. Hubungi kami untuk sesi konseling online/offline, psikotes rekrutmen karyawan, minat-bakat anak, dan Employee Assistance Program.",
  keywords: [
    "Konseling Psikologi Tangerang",
    "Biro Psikologi Tangerang",
    "Psikolog Tangerang",
    "Klinik Psikologi Tangerang",
    "Konseling Online",
    "Asesmen Psikologi Tangerang",
    "Konseling Pernikahan Tangerang",
  ],
  openGraph: {
    title: "Konseling Psikologi Tangerang | Nuansa Psychology Consulting",
    description:
      "Solusi layanan konseling profesional & terpercaya di Tangerang oleh PT Nuansa Daya Persada. Ditangani oleh psikolog klinis SIPP resmi.",
    url: SITE_URL,
    siteName: "Nuansa Psychology Consulting",
    images: [
      {
        url: bannerImage.src,
        width: 1200,
        height: 630,
        alt: "Nuansa Psychology Consulting - Layanan Konseling Psikologi Tangerang",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konseling Psikologi Tangerang | Nuansa Psychology Consulting",
    description:
      "Solusi layanan konseling profesional & terpercaya di Tangerang oleh PT Nuansa Daya Persada. Ditangani oleh psikolog berpengalaman dengan SIPP resmi.",
    images: [bannerImage.src],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: bannerImage.src, type: "image/png" },
    ],
    apple: bannerImage.src,
  },
};

export const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#medicalbusiness`,
  "name": "Nuansa Psychology Consulting",
  "alternateName": "PT Nuansa Daya Persada",
  "description": siteMetadata.description,
  "url": SITE_URL,
  "telephone": "+628128453550",
  "email": "layanan@nuansaconsulting.com",
  "priceRange": "$$",
  "medicalSpecialty": "Psychology",
  "knowsAbout": [
    "Clinical Psychology",
    "Child Psychology",
    "Industrial and Organizational Psychology",
    "Psychological Counselling",
    "Psychological Assessment",
    "Employee Assistance Program (EAP)",
  ],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress":
        "Bugel Mas Indah Jl. Besi IV Blok A17 No. 22, RT.001/RW.005, Bugel, Kec. Karawaci",
      "addressLocality": "Kota Tangerang",
      "addressRegion": "Banten",
      "postalCode": "15113",
      "addressCountry": "ID",
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Proklamasi No 34, Cimone, Karawaci",
      "addressLocality": "Tangerang",
      "addressRegion": "Banten",
      "postalCode": "15114",
      "addressCountry": "ID",
    },
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.1847118,
    "longitude": 106.6080345,
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "16:00",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-812-8453-550",
    "contactType": "customer service",
    "email": "layanan@nuansaconsulting.com",
    "availableLanguage": ["Indonesian", "English"],
  },
  "sameAs": ["https://wa.me/628128453550"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nuansa Psychology Consulting",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/artikel?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
