"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// Above-the-fold component imported statically
import { HeroSection } from "@/components/sections/HeroSection";

// Below-the-fold components imported dynamically to reduce initial JS payload size and improve FCP/LCP
const AchievementsSection = dynamic(() => import("@/components/sections/AchievementsSection").then((m) => m.AchievementsSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[250px]" />
});

const ClientLogosSection = dynamic(() => import("@/components/sections/ClientLogosSection").then((m) => m.ClientLogosSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[120px]" />
});

const AboutUs = dynamic(() => import("@/components/sections/AboutUs").then((m) => m.AboutUs), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[600px]" />
});

const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then((m) => m.ServicesSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[600px]" />
});

const CostCalculatorSection = dynamic(() => import("@/components/sections/CostCalculatorSection").then((m) => m.CostCalculatorSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[500px]" />
});

const RelaxationSection = dynamic(() => import("@/components/sections/RelaxationSection").then((m) => m.RelaxationSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[450px]" />
});

const ComplaintGuideSection = dynamic(() => import("@/components/sections/ComplaintGuideSection").then((m) => m.ComplaintGuideSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[500px]" />
});

const TeamSection = dynamic(() => import("@/components/sections/TeamSection").then((m) => m.TeamSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[600px]" />
});

const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[500px]" />
});

const ArticlesSection = dynamic(() => import("@/components/sections/ArticlesSection").then((m) => m.ArticlesSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[500px]" />
});

const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then((m) => m.FAQSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[550px]" />
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then((m) => m.ContactSection), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[600px]" />
});

const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer), {
  ssr: false,
  loading: () => <SectionPlaceholder className="h-[300px]" />
});

import {
  SectionPlaceholder,
  LazySection,
  CustomCursor,
  ReadingProgress
} from "@/components/ui/LayoutUtils";

import { Navbar } from "@/components/sections/Navbar";

export default function Home() {
  // Page State
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-800 dark:text-stone-100 antialiased selection:bg-emerald-600/10 dark:selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200 transition-colors duration-300">
      <ReadingProgress />

      {/* PROFESSIONAL NAVBAR WITH INTUITIVE RESPONSIVE NAVIGATION */}
      <Navbar />

      <main id="main-content">
        {/* 1. Hero Section (Rebranding & Calming Visual) */}
        <HeroSection setCursorLabel={setCursorLabel} />

        {/* Dynamic Count & Interactive Impact Section */}
        <LazySection placeholder={<SectionPlaceholder className="h-[250px]" />}>
          <AchievementsSection />
        </LazySection>

        {/* Trusted Clients Carousel (Carousel Klien Nuansa) */}
        <LazySection placeholder={<SectionPlaceholder className="h-[120px]" />}>
          <ClientLogosSection />
        </LazySection>

        {/* 2. Profile & Tentang Kami (Visi Misi Santi Meliyanti) */}
        <LazySection id="about" placeholder={<SectionPlaceholder className="h-[600px]" />}>
          <AboutUs />
        </LazySection>

        {/* 3. 4 Pilar Layanan Psikologi (Dynamic Tab System) */}
        <LazySection id="layanan" placeholder={<SectionPlaceholder className="h-[600px]" />}>
          <ServicesSection />
        </LazySection>

        {/* 5. Cost Estimator Calculator (Tackles Conversion and Trust) */}
        <LazySection id="biaya" placeholder={<SectionPlaceholder className="h-[500px]" />}>
          <CostCalculatorSection />
        </LazySection>

        {/* 3.5. Interactive Relaxation Hub (Breath Guide & Sensory Soundscape) */}
        <LazySection placeholder={<SectionPlaceholder className="h-[450px]" />}>
          <RelaxationSection setCursorLabel={setCursorLabel} />
        </LazySection>

        {/* 4. Indonesian Standard Psychological Guidance Assistant */}
        <LazySection placeholder={<SectionPlaceholder className="h-[500px]" />}>
          <ComplaintGuideSection />
        </LazySection>

        {/* 6. Professional Team Section (Updated UI) */}
        <LazySection id="team" placeholder={<SectionPlaceholder className="h-[600px]" />}>
          <TeamSection />
        </LazySection>

        {/* 7. Testimonials & Trusted Clients (Real Institutions) */}
        <LazySection placeholder={<SectionPlaceholder className="h-[500px]" />}>
          <TestimonialsSection />
        </LazySection>
        
        {/* 7.5. Wawasan Batin: Psychological Insights & Mental Health Articles */}
        <LazySection placeholder={<SectionPlaceholder className="h-[500px]" />}>
          <ArticlesSection />
        </LazySection>

        {/* 8. FAQ & Reservation Procedure Accordion */}
        <LazySection id="faq" placeholder={<SectionPlaceholder className="h-[550px]" />}>
          <FAQSection />
        </LazySection>

        {/* 9. SEO Optimized Responsif Contact & Reservation Form */}
        <LazySection id="contact" placeholder={<SectionPlaceholder className="h-[600px]" />}>
          <ContactSection />
        </LazySection>
      </main>

      {/* 10. Professional Redesigned Footer (Cimone Tangerang Map Location) */}
      <LazySection placeholder={<SectionPlaceholder className="h-[300px]" />}>
        <Footer />
      </LazySection>

      <CustomCursor label={cursorLabel} />
    </div>
  );
}

