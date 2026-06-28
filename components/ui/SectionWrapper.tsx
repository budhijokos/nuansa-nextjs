"use client";

import React from "react";
import { ScrollReveal } from "./Animations";
import { StaggeredBadge } from "./Misc";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className = ""
}: SectionHeaderProps) {
  return (
    <ScrollReveal>
      <div className={`${align === "center" ? "text-center max-w-3xl mx-auto" : "text-left max-w-xl"} space-y-4 ${className}`}>
        {badge && (
          <StaggeredBadge
            delay={0.1}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30 inline-block"
          >
            {badge}
          </StaggeredBadge>
        )}
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 dark:text-white font-sans leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-stone-850 dark:text-stone-200 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}

interface SectionWrapperProps {
  id?: string;
  className?: string;
  badge?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  containerClassName?: string;
  showHeader?: boolean;
}

export function SectionWrapper({
  id,
  className = "",
  badge,
  title,
  description,
  children,
  onMouseEnter,
  onMouseLeave,
  containerClassName = "",
  showHeader = true
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-32 relative overflow-hidden ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`mx-auto max-w-7xl px-6 relative z-10 ${containerClassName}`}>
        {showHeader && title && (
          <SectionHeader 
            badge={badge} 
            title={title} 
            description={description} 
            className="mb-16 md:mb-20"
          />
        )}
        {children}
      </div>
    </section>
  );
}
