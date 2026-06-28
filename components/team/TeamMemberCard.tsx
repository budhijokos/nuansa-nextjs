"use client";

import React from "react";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { motion } from "motion/react";
import { SIPPBadge } from "@/components/ui/StatusIcons";

interface TeamMember {
  name: string;
  role: string;
  imageSrc: any;
  description: string;
  hasSipp: boolean;
  tag1: string;
  tag2: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-[#1a1a19] rounded-2xl p-6 border border-stone-200/80 dark:border-stone-850 shadow-sm flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default group/card h-full"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full relative shadow-sm border border-emerald-100/60 dark:border-emerald-950/40 bg-emerald-50 dark:bg-emerald-950/40 group/sipp">
            <div className="absolute inset-0 rounded-full overflow-hidden z-10">
              <ImageOptimizer
                src={member.imageSrc}
                alt={`Foto Profil ${member.name} - ${member.role} Nuansa Psychology Consulting`}
                fill
                sizes="96px"
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
            {member.hasSipp && <SIPPBadge />}
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-950 dark:text-white">{member.name}</h3>
            <span className="text-xs md:text-sm text-emerald-800 dark:text-emerald-400 font-mono tracking-wider">{member.role}</span>
          </div>
        </div>
        <p className="text-xs md:text-base text-stone-500 dark:text-stone-400 leading-relaxed">
          {member.description}
        </p>
      </div>
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between text-[11px] md:text-xs text-stone-400 dark:text-stone-500 font-medium font-mono">
        <span>{member.tag1}</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-bold">{member.tag2}</span>
      </div>
    </motion.div>
  );
}
