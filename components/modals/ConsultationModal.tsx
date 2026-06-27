"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronDown, 
  CheckCircle, 
  Info, 
  MessageSquare,
  ClipboardCheck
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultNotes?: string;
}

export function ConsultationModal({ isOpen, onClose, defaultNotes }: ConsultationModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("konseling_pendidikan_online");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [participantsCount, setParticipantsCount] = useState("10");
  const [isSuccessRedirecting, setIsSuccessRedirecting] = useState(false);
  const [waUrlToRedirect, setWaUrlToRedirect] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsSuccessRedirecting(false);
      setWaUrlToRedirect(null);
      setName("");
      setPhone("");
      setEmail("");
      setService("konseling_pendidikan_online");
      setDate("");
      setErrors({});
      setParticipantsCount("10");
      if (defaultNotes) {
        setNotes(defaultNotes);
      } else {
        setNotes("");
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, defaultNotes]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Safe redirect hook
  useEffect(() => {
    if (isSuccessRedirecting && waUrlToRedirect) {
      const timer = setTimeout(() => {
        try {
          window.open(waUrlToRedirect, "_blank", "noopener,noreferrer");
        } catch (e) {
          console.error("Popup blocked or failed to open", e);
        }
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isSuccessRedirecting, waUrlToRedirect]);

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

  if (!isOpen || !mounted) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) {
      errs.name = "Nama lengkap harus diisi";
    } else if (name.trim().length < 3) {
      errs.name = "Nama lengkap terlalu pendek (min 3 karakter)";
    }

    if (!phone.trim()) {
      errs.phone = "Nomor WhatsApp harus diisi";
    } else if (!/^(?:\+62|08)[0-9]{8,13}$/.test(phone.replace(/\s+/g, ""))) {
      errs.phone = "Format nomor WhatsApp tidak valid (contoh: 0812...)";
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Format email tidak valid";
    }

    if (!date) {
      errs.date = "Pilihan tanggal harus diisi";
    }

    const isTraining = service === "training_anak" || service === "training_organisasi";
    const isTest = service.endsWith("_perorangan") || service.endsWith("_klasikal");
    const needsParticipants = isTraining || isTest;
    if (needsParticipants) {
      if (!participantsCount || parseInt(participantsCount) <= 0) {
        errs.participants = "Jumlah peserta harus diisi dan lebih dari 0";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedServiceLabel = {
      konseling_pendidikan_online: "Konseling Pendidikan (Online)",
      konseling_pendidikan_offline: "Konseling Pendidikan (Tatap Muka)",
      konseling_anak_online: "Konseling Tumbuh Kembang Anak (Online)",
      konseling_anak_offline: "Konseling Tumbuh Kembang Anak (Tatap Muka)",
      konseling_remaja_online: "Konseling Psikologi Remaja (Online)",
      konseling_remaja_offline: "Konseling Psikologi Remaja (Tatap Muka)",
      konseling_keluarga_online: "Konseling Perkawinan/Keluarga (Online)",
      konseling_keluarga_offline: "Konseling Perkawinan/Keluarga (Tatap Muka)",
      konseling_trauma_online: "Konseling Trauma Healing (Online)",
      konseling_trauma_offline: "Konseling Trauma Healing (Tatap Muka)",
      iq_reguler_perorangan: "Tes IQ Reguler (Perorangan)",
      iq_lengkap_perorangan: "Tes IQ Lengkap (Perorangan)",
      abk_perorangan: "Tes Anak Berkebutuhan Khusus (Perorangan)",
      bakat_minat_perorangan: "Tes Penelusuran Bakat Minat (Perorangan)",
      penjurusan_perorangan: "Tes Penjurusan Sekolah & PT (Perorangan)",
      kepribadian_perorangan: "Tes Evaluasi Kepribadian (Perorangan)",
      pendidik_perorangan: "Assessment Tenaga Pendidik (Perorangan)",
      pegawai_perorangan: "Assessment Perekrutan Pegawai (Perorangan)",
      jabatan_perorangan: "Assessment Promosi Jabatan (Perorangan)",
      iq_reguler_klasikal: "Tes IQ Reguler (Klasikal)",
      iq_lengkap_klasikal: "Tes IQ Lengkap (Klasikal)",
      abk_klasikal: "Tes Anak Berkebutuhan Khusus (Klasikal)",
      bakat_minat_klasikal: "Tes Penelusuran Bakat Minat (Klasikal)",
      penjurusan_klasikal: "Tes Penjurusan Sekolah & PT (Klasikal)",
      kepribadian_klasikal: "Tes Evaluasi Kepribadian (Klasikal)",
      pendidik_klasikal: "Assessment Tenaga Pendidik (Klasikal)",
      pegawai_klasikal: "Assessment Perekrutan Pegawai (Klasikal)",
      jabatan_klasikal: "Assessment Promosi Jabatan (Klasikal)",
      training_anak: "Training Anak & Remaja",
      training_organisasi: "Training Organisasi"
    }[service] || service;

    const isTraining = service === "training_anak" || service === "training_organisasi";
    const isTest = service.endsWith("_perorangan") || service.endsWith("_klasikal");
    const needsParticipants = isTraining || isTest;
    const isCounseling = service.startsWith("konseling_");

    let detailLines = "";
    if (needsParticipants) {
      detailLines = `\n- *Tanggal Pelaksanaan:* ${date}\n- *Jumlah Peserta:* ${participantsCount} orang`;
    } else {
      detailLines = `\n- *Rencana Tanggal:* ${date}`;
    }

    const notesLabel = isCounseling ? "Catatan Keluhan" : "Catatan & Pesan Khusus";

    const waMessage = 
`*RESERVASI KONSULTASI BARU*
==========================
Halo Admin Nuansa, saya ingin menjadwalkan sesi konsultasi baru.

- *Nama:* ${name.trim()}
- *WhatsApp:* ${phone.trim()}
${email ? `- *Email:* ${email.trim()}\n` : ""}- *Layanan:* ${selectedServiceLabel}${detailLines}
- *${notesLabel}:* "${notes.trim() || "-"}"
==========================
Sent from Nuansa Psychology Consulting portal.`;

    const encodedText = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/628128453550?text=${encodedText}`;
    setWaUrlToRedirect(waUrl);
    setIsSuccessRedirecting(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#065f46', '#059669', '#34d399', '#fbbf24', '#f59e0b']
    });
  };

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] overflow-y-auto bg-stone-900/60 backdrop-blur-sm">
        <div className="flex min-h-full items-start justify-center p-4 py-12 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent animate-none"
            onClick={onClose}
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#151514] rounded-[2.5rem] border border-stone-200/60 dark:border-stone-850 p-6 md:p-8 shadow-2xl dark:shadow-stone-950/50 overflow-hidden max-h-[85vh] sm:max-h-[90vh] flex flex-col z-10 my-auto transition-colors duration-200"
          >
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none -translate-y-12 translate-x-12" />

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
                  <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight font-sans">Data Berhasil Disiapkan!</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-prose leading-relaxed px-2 font-sans">
                    Formulir pendaftaran konsultasi Anda telah divalidasi dengan sukses. Jika browser Anda memblokir pengalihan otomatis, silakan klik tombol hijau di bawah ini.
                  </p>
                </div>

                {/* Progress Redirect Indicator */}
                <div className="w-full max-w-[220px] space-y-3">
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

                {waUrlToRedirect && (
                  <div className="pt-2 w-full flex flex-col items-center space-y-3">
                    <a 
                      href={waUrlToRedirect} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition duration-200 cursor-pointer space-x-2 w-full max-w-[240px]"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Hubungi WhatsApp</span>
                    </a>
                    <button
                      onClick={onClose}
                      className="text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 transition cursor-pointer"
                    >
                      Tutup Jendela
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-stone-100 dark:border-stone-850 z-10/10">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Konsultasi Psikologi</span>
                  </div>
                  <h3 className="text-xl font-black text-stone-900 dark:text-white leading-none">Formulir Pendaftaran</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-full transition cursor-pointer"
                  aria-label="Tutup Pendaftaran Konsultasi"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-4 space-y-5 my-2 text-left">
                
                {/* Onboarding/Process Steps */}
                <div className="bg-stone-50 dark:bg-[#1a1a19] p-4 rounded-2xl border border-stone-100 dark:border-stone-850">
                  <span className="block text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest text-center mb-3">Bagaimana cara kerjanya?</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: ClipboardCheck, label: "Isi Data" },
                      { icon: CheckCircle, label: "Validasi" },
                      { icon: MessageSquare, label: "WA Admin" },
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center justify-center text-center space-y-1.5 p-2 rounded-xl bg-white dark:bg-stone-800/50">
                        <step.icon className="h-4 w-4 text-emerald-800 dark:text-emerald-400" />
                        <span className="text-[9px] font-bold text-stone-700 dark:text-stone-300 leading-tight">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-client-name" className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Nama Lengkap *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      id="modal-client-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama lengkap Anda"
                      className={`w-full h-11 pl-10 pr-4 bg-stone-50 dark:bg-[#1a1a19] border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/15 focus:border-emerald-800 transition text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 ${
                        errors.name ? "border-red-500 bg-red-50/10 dark:bg-red-950/20" : "border-stone-200 dark:border-stone-800"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[11px] font-medium pl-1">{errors.name}</p>
                  )}
                </div>

                {/* WA Number */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-client-phone" className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Nomor WhatsApp *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      id="modal-client-phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 0812XXXXXXXX"
                      className={`w-full h-11 pl-10 pr-4 bg-stone-50 dark:bg-[#1a1a19] border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/15 focus:border-emerald-800 transition text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 ${
                        errors.phone ? "border-red-500 bg-red-50/10 dark:bg-red-950/20" : "border-stone-200 dark:border-stone-800"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] font-medium pl-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-client-email" className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Alamat Email (Opsional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="modal-client-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className={`w-full h-11 pl-10 pr-4 bg-stone-50 dark:bg-[#1a1a19] border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/15 focus:border-emerald-800 transition text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[11px] font-medium pl-1">{errors.email}</p>
                  )}
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-service-type" className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Layanan yang Dibutuhkan</label>
                  <div className="relative">
                    <select
                      id="modal-service-type"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full h-11 px-4 bg-stone-50 dark:bg-[#1a1a19] border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/15 focus:border-emerald-800 transition appearance-none cursor-pointer text-stone-850 dark:text-stone-200"
                    >
                        <optgroup label="Layanan Konseling" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white font-semibold">
                          <option value="konseling_pendidikan_online" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Pendidikan (Online)</option>
                          <option value="konseling_pendidikan_offline" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Pendidikan (Tatap Muka)</option>
                          <option value="konseling_anak_online" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Tumbuh Kembang Anak (Online)</option>
                          <option value="konseling_anak_offline" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Tumbuh Kembang Anak (Tatap Muka)</option>
                          <option value="konseling_remaja_online" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Psikologi Remaja (Online)</option>
                          <option value="konseling_remaja_offline" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Psikologi Remaja (Tatap Muka)</option>
                          <option value="konseling_keluarga_online" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Perkawinan/Keluarga (Online)</option>
                          <option value="konseling_keluarga_offline" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Perkawinan/Keluarga (Tatap Muka)</option>
                          <option value="konseling_trauma_online" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Trauma Healing (Online)</option>
                          <option value="konseling_trauma_offline" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Konseling Trauma Healing (Tatap Muka)</option>
                        </optgroup>
                        <optgroup label="Tes Perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white font-semibold">
                          <option value="iq_reguler_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes IQ Reguler</option>
                          <option value="iq_lengkap_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes IQ Lengkap</option>
                          <option value="abk_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Anak Berkebutuhan Khusus</option>
                          <option value="bakat_minat_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Penelusuran Bakat Minat</option>
                          <option value="penjurusan_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Penjurusan Sekolah & PT</option>
                          <option value="kepribadian_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Evaluasi Kepribadian</option>
                          <option value="pendidik_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Assessment Tenaga Pendidik</option>
                          <option value="pegawai_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Assessment Perekrutan Pegawai</option>
                          <option value="jabatan_perorangan" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Assessment Promosi Jabatan</option>
                        </optgroup>
                        <optgroup label="Tes Klasikal / Kelompok" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white font-semibold">
                          <option value="iq_reguler_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes IQ Reguler</option>
                          <option value="iq_lengkap_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes IQ Lengkap</option>
                          <option value="abk_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Anak Berkebutuhan Khusus</option>
                          <option value="bakat_minat_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Penelusuran Bakat Minat</option>
                          <option value="penjurusan_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Penjurusan Sekolah & PT</option>
                          <option value="kepribadian_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Tes Evaluasi Kepribadian</option>
                          <option value="pendidik_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Assessment Tenaga Pendidik</option>
                          <option value="pegawai_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Assessment Perekrutan Pegawai</option>
                          <option value="jabatan_klasikal" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white">Assessment Promosi Jabatan</option>
                        </optgroup>
                        <option value="training_anak" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white font-semibold">Training Anak & Remaja</option>
                        <option value="training_organisasi" className="bg-white dark:bg-[#151514] text-stone-900 dark:text-white font-semibold">Training Organisasi</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-stone-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-session-date" className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    {service === "training_anak" || service === "training_organisasi"
                      ? "Tanggal Pelaksanaan Training *"
                      : service.endsWith("_perorangan") || service.endsWith("_klasikal")
                      ? "Tanggal Pelaksanaan Tes *"
                      : "Rencana Tanggal Janji Temu *"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <input
                      id="modal-session-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full h-11 pl-10 pr-4 bg-stone-50 dark:bg-[#1a1a19] border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/15 focus:border-emerald-800 transition cursor-pointer text-stone-900 dark:text-white dark:[color-scheme:dark] ${
                        errors.date ? "border-red-500 bg-red-50/10 dark:bg-red-950/20" : "border-stone-200 dark:border-stone-800"
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-[11px] font-medium pl-1">{errors.date}</p>
                  )}
                </div>

                {/* Training & Test Participants Input */}
                {(service === "training_anak" || service === "training_organisasi" || service.endsWith("_perorangan") || service.endsWith("_klasikal")) && (
                  <div className="space-y-1.5" id="modal-participants">
                    <label htmlFor="modal-participants-count" className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Estimasi Jumlah Peserta *</label>
                    <input
                      id="modal-participants-count"
                      type="number"
                      min={1}
                      required
                      value={participantsCount}
                      onChange={(e) => {
                        setParticipantsCount(e.target.value);
                        if (e.target.value && parseInt(e.target.value) > 0) {
                          setErrors(prev => {
                            const next = { ...prev };
                            delete next.participants;
                            return next;
                          });
                        }
                      }}
                      placeholder="Masukkan perkiraan jumlah peserta"
                      className={`w-full h-11 px-4 bg-stone-50 dark:bg-[#1a1a19] border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/15 focus:border-emerald-800 transition text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 ${
                        errors.participants ? "border-red-500 bg-red-50/10 dark:bg-red-950/20" : "border-stone-200 dark:border-stone-800"
                      }`}
                    />
                    {errors.participants && (
                      <p className="text-red-500 text-[11px] font-medium pl-1">{errors.participants}</p>
                    )}
                  </div>
                )}

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-additional-notes" className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    {service.startsWith("konseling_")
                      ? "Keluhan / Catatan Tambahan (Opsional)"
                      : "Catatan & Pesan Khusus (opsional)"}
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none text-stone-400 dark:text-stone-500">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <textarea
                      id="modal-additional-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={service.startsWith("konseling_")
                        ? "Ceritakan singkat latar belakang kebutuhan konsultasi Anda..."
                        : "Tuliskan catatan atau pesan khusus Anda di sini..."}
                      rows={3}
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-[#1a1a19] border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/15 focus:border-emerald-800 transition resize-none text-stone-800 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed bg-stone-50 dark:bg-[#1a1a19] p-3 rounded-2xl border border-stone-100/50 dark:border-stone-850 flex gap-2">
                  <Info className="h-4 w-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dengan menekan tombol kirim, Anda akan diarahkan langsung ke WhatsApp resmi Nuansa Psychology Consulting untuk menyelesaikan penjadwalan.</span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 bg-emerald-800 dark:bg-emerald-750 hover:bg-emerald-950 dark:hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01] active:scale-95"
                  >
                    <span>Kirim via WhatsApp</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
