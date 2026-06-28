"use client";

import React from "react";
import { motion } from "motion/react";
import { CheckCircle, Info, ArrowRight } from "lucide-react";
import { StaggeredBadge, GlassIcon } from "@/components/ui/Misc";
import { ServiceDetailItem } from "@/lib/constants";

interface ServiceDetailCardProps {
  service: ServiceDetailItem;
}

export function ServiceDetailCard({ service }: ServiceDetailCardProps) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
    >
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center space-x-4">
          <GlassIcon icon={service.icon} color={service.color} />
          <div className="space-y-1">
            <StaggeredBadge delay={0.1} className="text-[10px] uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 font-bold">
              {service.badge}
            </StaggeredBadge>
            <h3 className="text-2xl lg:text-3xl font-bold text-stone-950 dark:text-white font-sans tracking-tight">
              {service.title}
            </h3>
          </div>
        </div>
        
        <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
          {service.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-base text-stone-700 dark:text-stone-300 font-medium">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl p-8 space-y-6 border border-emerald-150 dark:border-emerald-800/40 relative overflow-hidden group/box">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 blur-2xl -translate-y-1/2 translate-x-1/2 rounded-full" />
        <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-400 flex items-center">
          <Info className="h-4 w-4 text-emerald-800 dark:text-emerald-500 mr-2" />
          {service.metaBox.title}
        </h4>
        
        {service.metaBox.type === "list" ? (
          <div className="space-y-2 text-xs md:text-base text-emerald-900 dark:text-emerald-300/90 leading-relaxed">
            {service.metaBox.pricingList?.map((item, i) => (
              <div 
                key={i} 
                className={`flex justify-between ${
                  i < (service.metaBox.pricingList?.length ?? 0) - 1 
                    ? "border-b border-emerald-200/60 dark:border-emerald-900/40 pb-1.5" 
                    : "pt-1.5"
                }`}
              >
                <span>{item.label}</span>
                <strong className="text-stone-900 dark:text-stone-100">{item.price}</strong>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs md:text-base text-emerald-900 dark:text-emerald-300/90 leading-relaxed">
            {service.metaBox.shortDesc}
          </p>
        )}

        {service.metaBox.note && (
          <span className="block text-[10px] md:text-xs text-stone-500 dark:text-stone-400 font-medium mt-1 leading-normal">
            {service.metaBox.note}
          </span>
        )}

        <a
          href={service.metaBox.ctaHref}
          target={service.metaBox.ctaExternal ? "_blank" : undefined}
          rel={service.metaBox.ctaExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center text-xs md:text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 mt-2"
        >
          {service.metaBox.ctaText} <ArrowRight className="ml-1 h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
}
