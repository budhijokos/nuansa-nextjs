"use client";

import React from "react";
import { motion } from "motion/react";
import { SIPPBadge } from "@/components/ui/StatusIcons";
import { ScrollReveal } from "@/components/ui/Animations";
import { TEAM_MEMBERS } from "@/lib/team-data";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";

export function TeamSection() {
  return (
    <SectionWrapper 
      className="bg-stone-100/50 dark:bg-[#1c1c1a]/50 border-y border-stone-200/50 dark:border-stone-850"
      badge="Tim Ahli Praktisi"
      title="Didukung oleh Tim Praktisi Berlisensi Resmi"
      description="Kami didukung oleh narasumber tangguh, konselor, serta psikolog profesional berkompeten pascasarjana yang berdedikasi menjaga kualitas setiap sesi."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEAM_MEMBERS.map((member, idx) => (
          <TeamMemberCard key={idx} member={member} />
        ))}
      </div>
    </SectionWrapper>
  );
}
