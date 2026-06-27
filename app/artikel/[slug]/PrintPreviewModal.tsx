"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Download, Printer, X, Info, FileText } from "lucide-react";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { toast } from "sonner";
import logoNuansa from "@/src/assets/images/logo-nuansa/logo-nuansa.webp";
import { getArticleImage } from "@/lib/image-registry";

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
  article: any;
  detail: any;
  readingTime: string;
  wordCount?: number;
}

export default function PrintPreviewModal({ isOpen, onClose, onPrint, article, detail, readingTime, wordCount }: PrintPreviewModalProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsGenerating(true);
    const toastId = toast.loading("Menyiapkan dokumen PDF...");

    try {
      const { generatePDFFromElement } = await import("@/lib/pdf-generator");
      
      await generatePDFFromElement(contentRef.current, {
        filename: `${article.slug}-nuansa-insight`,
        toastId
      });
      
      setIsGenerating(false);
    } catch (error) {
      // Error handling is managed inside the utility (toasts/logs)
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/80 backdrop-blur-md p-4 md:p-8 overflow-hidden print-modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-5xl h-full flex flex-col rounded-3xl shadow-2xl overflow-hidden print-modal-content"
      >
        {/* Modal Header */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50 gap-4 no-print">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shadow-inner">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 leading-none">Pratinjau Dokumen</h3>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1">Nuansa Insight • PDF Export</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold shadow-lg hover:bg-stone-800 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className={`h-4 w-4 ${isGenerating ? 'animate-bounce' : ''}`} />
              <span>{isGenerating ? "Menyimpan..." : "Unduh PDF"}</span>
            </button>
            <button
              onClick={onPrint}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-900 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 transition cursor-pointer"
              title="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Content (Preview Area) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-stone-200/30 scrollbar-thin scrollbar-thumb-stone-300 print-modal-scroll">
          <div 
            ref={contentRef}
            style={{ width: '800px' }}
            className="bg-white shadow-xl mx-auto p-12 md:p-16 border border-stone-200 preview-content print-document overflow-hidden"
          >
            {/* Logo & Header */}
            <div className="flex flex-row items-center justify-between border-b-2 border-[#10b981] pb-6 mb-8 w-full pdf-block">
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12 bg-white flex-shrink-0">
                  <img src={logoNuansa.src} alt="Logo" width={48} height={48} className="object-contain w-full h-full" crossOrigin="anonymous" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-2xl font-black text-[#1a1a1a] tracking-tighter leading-none">NUANSA</h4>
                  <p className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.1em] mt-1">Psychology Consulting</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-widest leading-tight">Insight Kesehatan</p>
                <p className="text-[10px] text-[#999999] uppercase tracking-widest mt-0.5">nuansaconsulting.com</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-8">
              <div className="space-y-4 pdf-block">
                <span className="text-[10px] font-bold text-[#047857] uppercase tracking-widest px-3 py-1 bg-[#f0fdf4] rounded-full border border-[#dcfce7]">
                  {article.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1c1917] leading-tight">
                  {article.title}
                </h1>
                <div className="flex items-center space-x-4 text-[#a8a29e] text-[10px] font-mono">
                  <span>{readingTime} Bacaan</span>
                  {wordCount && wordCount > 0 && (
                    <>
                      <span>•</span>
                      <span>{wordCount.toLocaleString()} Kata</span>
                    </>
                  )}
                  <span>•</span>
                  <span>Ditinjau oleh Tim Psikolog Nuansa</span>
                </div>
              </div>

              {/* Hero Image in Preview */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-stone-100 pdf-block">
                <img 
                  src={(article as any).image || getArticleImage(article.slug, article.category)}
                  alt={article.title}
                  className="object-cover w-full h-full"
                  crossOrigin="anonymous"
                />
              </div>

              <div className="prose prose-stone prose-sm max-w-none text-[#44403c] space-y-4">
                {detail ? (
                  detail.content.map((item: any, idx: number) => {
                    if (item.type === "h2") return <h2 key={idx} className="text-xl font-bold text-[#1c1917] pt-4 border-b border-[#f5f5f4] pb-2 pdf-block break-inside-avoid">{item.text}</h2>;
                    if (item.type === "p") return <p key={idx} className="leading-relaxed text-xs text-[#44403c] pdf-block break-inside-avoid">{item.text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')}</p>;
                    if (item.type === "ul") return (
                      <ul key={idx} className="space-y-1 list-disc pl-5 text-xs text-[#44403c]">
                        {item.items.map((li: string, lidx: number) => (
                          <li key={lidx} className="pdf-block break-inside-avoid">
                            {li.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')}
                          </li>
                        ))}
                      </ul>
                    );
                    return null;
                  })
                ) : (
                  <p className="italic text-[#78716c] text-xs pdf-block break-inside-avoid">{article.excerpt}</p>
                )}
              </div>

              {/* Footer in Preview */}
              <div className="pt-8 mt-12 border-t border-[#f5f5f4] text-center text-[#a8a29e] pdf-block">
                <p className="text-[9px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} Nuansa Psychology Consulting</p>
                <p className="text-[8px] mt-1 italic">Dokumen ini diterbitkan untuk tujuan edukasi dan wawasan diri.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-center space-x-2 text-[10px] text-stone-500 font-medium">
          <Info className="h-3 w-3" />
          <span>Saran: Gunakan tombol &quot;Unduh PDF&quot; untuk hasil terbaik format digital.</span>
        </div>
      </motion.div>
    </div>
  );
}
