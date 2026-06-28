import React from "react";
import { ScrollReveal } from "@/components/ui/Animations";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { ContactInfo } from "./ContactInfo";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ContactSection() {
  return (
    <SectionWrapper 
      className="bg-stone-50 dark:bg-[#121211]"
      showHeader={false}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Contact Details & Info */}
          <ContactInfo />

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-10 shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-850 relative group">
              <div className="absolute -top-4 -right-4 bg-emerald-800 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg z-20 uppercase tracking-widest">
                Formulir Reservasi SIPP
              </div>
              <ReservationForm />
            </div>
            
            <p className="text-center mt-6 text-[10px] text-stone-400 dark:text-stone-600 font-medium">
              Sistem Reservasi Terintegrasi WhatsApp v2.4.0 • Keamanan Data Berlapis SSL
            </p>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
