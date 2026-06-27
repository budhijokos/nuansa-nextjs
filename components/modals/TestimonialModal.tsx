"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Info, CheckCircle, Send } from "lucide-react";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const [testimonyName, setTestimonyName] = useState("");
  const [testimonyRole, setTestimonyRole] = useState("");
  const [testimonyRating, setTestimonyRating] = useState(5);
  const [testimonyText, setTestimonyText] = useState("");
  const [testimonyType, setTestimonyType] = useState<"perorangan" | "lembaga">("perorangan");
  const [testimonyValidationErrors, setTestimonyValidationErrors] = useState<string[]>([]);
  const [testimonyValidationSuccess, setTestimonyValidationSuccess] = useState(false);
  const [isSuccessRedirecting, setIsSuccessRedirecting] = useState(false);
  const [waUrlToRedirect, setWaUrlToRedirect] = useState<string | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen) {
      setTestimonyName("");
      setTestimonyRole("");
      setTestimonyRating(5);
      setTestimonyText("");
      setTestimonyType("perorangan");
      setTestimonyValidationErrors([]);
      setTestimonyValidationSuccess(false);
      setIsSuccessRedirecting(false);
      setWaUrlToRedirect(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Safe redirect hook
  useEffect(() => {
    if (isSuccessRedirecting && waUrlToRedirect) {
      const timer = setTimeout(() => {
        window.location.href = waUrlToRedirect;
        setIsSuccessRedirecting(false);
        setWaUrlToRedirect(null);
        onClose();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isSuccessRedirecting, waUrlToRedirect, onClose]);

  // Handle escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Client-side Professional Tone Checker for Testimonials (Indonesian Standard)
  const validateTestimonyTone = (text: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const trimmed = text.trim();
    
    if (trimmed.length < 20) {
      errors.push("Ulasanmu terlalu singkat (minimal 20 karakter) agar memberikan gambaran berbobot.");
    }
    
    const slangWords = [
      /\banjing\b/i, /\bgoblok\b/i, /\btolol\b/i, /\bbege\b/i, /\bbego\b/i, /\bkamfret\b/i, /\bkampret\b/i,
      /\bpantek\b/i, /\bbangsat\b/i, /\bbabi\b/i, /\bgw\b/i, /\bgue\b/i, /\blo\b/i, /\blu\b/i, /\belu\b/i,
      /\bgua\b/i, /\bjelek bgt\b/i, /\bkntl\b/i, /\bngntt\b/i, /\bjancok\b/i, /\bcox\b/i, /\basu\b/i,
      /\bbajingan\b/i, /\bgila\b/i, /\bjelek\b/i, /\bmarah\b/i, /\bparah\b/i
    ];
    
    const matchedSlang: string[] = [];
    slangWords.forEach((regex) => {
      const match = trimmed.match(regex);
      if (match) {
        matchedSlang.push(`"${match[0]}"`);
      }
    });

    if (matchedSlang.length > 0) {
      errors.push(`Ulasan memuat kata informal/negatif: ${matchedSlang.join(", ")}. Mohon gunakan tata krama bahasa baku (seperti "Saya", "Kami", "sangat baik", "perlu ditingkatkan") agar sesuai standar profesionalisme psikologi klinis.`);
    }

    const professionalKeywords = [
      /bantu/i, /psikolog/i, /nyaman/i, /solusi/i, /konseling/i, /terapi/i, /puas/i, /rekomendasi/i,
      /baik/i, /ramah/i, /ilmiah/i, /tes/i, /bimbingan/i, /profesional/i, /tenang/i, /lega/i, /ikhlas/i
    ];
    
    const hasKeyword = professionalKeywords.some(regex => regex.test(trimmed));
    if (!hasKeyword && trimmed.length > 0) {
      errors.push("Ulasan kurang mengandung istilah konteks bimbingan psikologi. Tambahkan kata seperti 'psikolog', 'layanan', 'membantu', 'nyaman', 'konseling', atau 'bimbingan' agar ulasanmu bernilai edukatif.");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleSendTestimonialToWhatsApp = () => {
    const check = validateTestimonyTone(testimonyText);
    if (!check.isValid) {
      setTestimonyValidationErrors(check.errors);
      setTestimonyValidationSuccess(false);
      return;
    }
    
    setTestimonyValidationErrors([]);
    setTestimonyValidationSuccess(true);

    const stars = "⭐".repeat(testimonyRating);
    const categoryText = testimonyType === "perorangan" ? "Klien Perorangan" : "Lembaga / Instansi";
    const waMessage = 
`*TESTIMONI KLIEN BARU*
==========================
*Nama:* ${testimonyName.trim() || "Anonim"}
*Profesi:* ${testimonyRole.trim() || "-"}
*Kategori:* ${categoryText}
*Review:* ${stars} (${testimonyRating}/5)

*Ulasan Sesi:*
"${testimonyText.trim()}"
==========================
Sent from Nuansa Psychology Consulting portal.`;

    const encodedText = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/628128453550?text=${encodedText}`;
    
    setWaUrlToRedirect(waUrl);
    setIsSuccessRedirecting(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] overflow-y-auto bg-stone-900/60 backdrop-blur-sm">
        <div className="flex min-h-full items-start justify-center p-4 py-8 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent animate-none"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white dark:bg-[#151514] rounded-3xl border border-stone-200 dark:border-stone-850 shadow-2xl dark:shadow-stone-950/50 p-6 md:p-8 space-y-6 z-10 animate-none text-left my-auto transition-colors duration-200"
          >
            {isSuccessRedirecting ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 z-10"
              >
                <div className="relative flex flex-col items-center space-y-6 pt-4 font-sans">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center border-2 border-emerald-500/20 dark:border-emerald-500/10 shadow-inner"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="w-14 h-14 bg-emerald-800 dark:bg-emerald-700 rounded-full flex items-center justify-center shadow-md text-white"
                    >
                      <CheckCircle className="h-7 w-7 text-white" />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight font-sans">Ulasan Berhasil Disiapkan!</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-prose leading-relaxed px-2 font-sans">
                      Testimoni Anda telah divalidasi dan siap dikirim. Sistem sekarang mengarahkan Anda ke WhatsApp untuk menyelesaikan proses kirim.
                    </p>
                  </div>

                  {/* Progress Redirect Indicator */}
                  <div className="w-full max-w-[220px] space-y-3 pt-4">
                    <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.2, ease: "linear" }}
                        className="h-full bg-emerald-800 dark:bg-emerald-600 rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-1.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase animate-pulse font-sans">
                      <span>Mengalihkan ke WhatsApp</span>
                      <span className="inline-block w-1 h-1 bg-emerald-800 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="inline-block w-1 h-1 bg-emerald-800 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="inline-block w-1 h-1 bg-emerald-800 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition cursor-pointer"
                  aria-label="Tutup Kirim Testimoni"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Title & Badge */}
                <div className="space-y-1.5 border-b border-stone-100 dark:border-stone-850 pb-4 text-left">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 text-[10px] font-bold uppercase tracking-wider">
                    Umpan Balik Sesi SIPP
                  </div>
                  <h3 className="text-lg font-extrabold text-stone-900 dark:text-white font-sans">Kirim Testimoni Layanan</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                    Bagikan pengalaman pemulihan atau pertumbuhan diri yang kamu rasakan selama sesi bersama Psikolog Nuansa.
                  </p>
                </div>

                {/* Validation Warning block */}
                {testimonyValidationErrors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-950 dark:text-amber-200 p-4 rounded-xl text-xs space-y-1.5 font-medium text-left font-sans"
                  >
                    <p className="font-bold flex items-center space-x-1 text-amber-950 dark:text-amber-100">
                      <Info className="h-4 w-4 text-amber-700 dark:text-amber-400 shrink-0" />
                      <span>Catatan Kelayakan Bahasa:</span>
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-900 dark:text-amber-300 font-sans">
                      {testimonyValidationErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {testimonyValidationSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-300 p-4 rounded-xl text-xs flex items-start space-x-2 font-semibold text-left"
                  >
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-700 dark:text-emerald-450 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-950 dark:text-emerald-200 font-bold">Ulasan Memenuhi Standar Bahasa!</p>
                      <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-normal mt-0.5 font-sans">Membuka WhatsApp untuk mengirim pesanmu secara aman ke admin Nuansa.</p>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4 text-left">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="testimony-client-name" className="text-[10px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">Nama Lengkap</label>
                    <input
                      id="testimony-client-name"
                      type="text"
                      required
                      placeholder="Contoh: Swastika Rahayu"
                      value={testimonyName}
                      onChange={(e) => setTestimonyName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#1a1a19] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-850 dark:text-stone-200 font-sans placeholder:text-stone-400 dark:placeholder:text-stone-600"
                    />
                  </div>

                  {/* Role / Profession */}
                  <div className="space-y-1">
                    <label htmlFor="testimony-client-role" className="text-[10px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block font-sans">Profesi / Jabatan / Instansi</label>
                    <input
                      id="testimony-client-role"
                      type="text"
                      required
                      placeholder="Contoh: Karyawan Swasta / Ibu Rumah Tangga"
                      value={testimonyRole}
                      onChange={(e) => setTestimonyRole(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#1a1a19] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-850 dark:text-stone-200 font-sans placeholder:text-stone-400 dark:placeholder:text-stone-600"
                    />
                  </div>

                  {/* Categories and Stars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category Type */}
                    <div className="space-y-1.5 text-left">
                      <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">Kategori Sesi Kamu</span>
                      <div className="flex space-x-2 bg-stone-100 dark:bg-stone-900 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setTestimonyType("perorangan")}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide transition cursor-pointer ${
                            testimonyType === "perorangan"
                              ? "bg-white dark:bg-stone-800 text-emerald-850 dark:text-emerald-450 shadow-sm"
                              : "text-stone-500 dark:text-stone-450 hover:text-stone-800 dark:hover:text-stone-205"
                          }`}
                        >
                          Perorangan
                        </button>
                        <button
                          type="button"
                          onClick={() => setTestimonyType("lembaga")}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide transition cursor-pointer ${
                            testimonyType === "lembaga"
                              ? "bg-white dark:bg-stone-800 text-emerald-850 dark:text-emerald-450 shadow-sm"
                              : "text-stone-500 dark:text-stone-450 hover:text-stone-800 dark:hover:text-stone-205"
                          }`}
                        >
                          Lembaga
                        </button>
                      </div>
                    </div>

                    {/* Rating Stars Selection */}
                    <div className="space-y-1.5 text-left">
                      <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block font-sans">Rating Sesi SIPP</span>
                      <div className="flex items-center space-x-1.5 h-8">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isSelected = star <= testimonyRating;
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setTestimonyRating(star)}
                              className="p-1 hover:scale-110 active:scale-95 transition cursor-pointer"
                              aria-label={`Beri bintang ${star}`}
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  isSelected ? "fill-amber-400 text-amber-400" : "text-stone-300 dark:text-stone-700"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial text block */}
                  <div className="space-y-1 text-left">
                    <div className="flex justify-between items-center bg-transparent">
                      <label htmlFor="testimony-client-text" className="text-[10px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">Isi Ulasan Testimoni</label>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono font-bold">{testimonyText.length} karakter</span>
                    </div>
                    <textarea
                      id="testimony-client-text"
                      rows={4}
                      required
                      placeholder="Contoh: Sesi konseling di Nuansa luar biasa membantu saya mengurai cemas berlebih. Psikolog mendengarkan dengan penuh empati..."
                      value={testimonyText}
                      onChange={(e) => setTestimonyText(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-300 dark:border-stone-850 bg-white dark:bg-[#1a1a19] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-850 dark:text-stone-200 font-sans placeholder:text-stone-400 dark:placeholder:text-stone-600"
                    />
                    <p className="text-[9px] text-emerald-850 dark:text-emerald-400 leading-normal font-sans">
                      *Tip: Untuk lolos validasi tata krama, pakailah kata formal (Saya/Kami) & sapaan &apos;Psikolog Nuansa&apos;.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-850">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 text-xs font-bold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSendTestimonialToWhatsApp}
                    disabled={!testimonyName.trim() || !testimonyRole.trim() || !testimonyText.trim()}
                    className="flex-1 py-3 text-xs font-extrabold text-white bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-950 dark:hover:bg-emerald-600 rounded-xl transition cursor-pointer disabled:bg-stone-100 dark:disabled:bg-stone-900 disabled:text-stone-400 dark:disabled:text-stone-600 flex items-center justify-center space-x-1.5 shadow-md active:scale-95"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Kirim Testimoni</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
