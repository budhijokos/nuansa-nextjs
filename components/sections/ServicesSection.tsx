"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle,
  Info,
  ArrowRight
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/Animations";
import { SERVICES_DATABASE } from "@/lib/constants";
import { ServiceTabButton } from "@/components/service/ServiceTabButton";
import { ServiceDetailCard } from "@/components/service/ServiceDetailCard";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ServicesSection() {
  const [selectedServiceTab, setSelectedServiceTab] = useState<string>("konseling");

  const activeService = SERVICES_DATABASE.find(s => s.id === selectedServiceTab);

  return (
    <SectionWrapper
      className="bg-stone-50 dark:bg-stone-950"
      badge="Fokus Pendampingan Kami"
      title="Layanan yang Kami Hadirkan"
      description="Kami merancang solusi asistensi psikologis terpadu untuk individu dari berbagai tahapan usia, siswa sekolah, hingga kebutuhan organisasi profesional."
    >
      <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
        {SERVICES_DATABASE.map((tab) => (
          <ServiceTabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={selectedServiceTab === tab.id}
            onClick={() => setSelectedServiceTab(tab.id)}
          />
        ))}
      </div>

      <div className="bg-white dark:bg-[#1e1e1d] rounded-[40px] p-8 lg:p-16 border border-stone-200/60 dark:border-stone-850 shadow-2xl min-h-[450px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeService && (
            <ServiceDetailCard service={activeService} />
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
