"use client";

import React, { useState } from "react";
import { ConsultationModal } from "@/components/modals/ConsultationModal";

export function ConsultationCTAButton({ 
  className, 
  children,
  articleTitle
}: { 
  className?: string; 
  children: React.ReactNode;
  articleTitle?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`${className} consultation-cta no-print`}>
        {children}
      </button>
      <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} defaultNotes={articleTitle ? `Tertarik setelah membaca artikel: "${articleTitle}"` : undefined} />
    </>
  );
}
