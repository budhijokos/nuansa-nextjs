"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Send, 
  ClipboardCheck, 
  CheckCircle,
  MessageCircle
} from "lucide-react";
import { 
  LoadingCylinder
} from "@/components/ui/Animations";
import {
  AnimatedCheckmark
} from "@/components/ui/StatusIcons";
import {
  PrimaryButton,
  SecondaryButton
} from "@/components/ui/Button";
import { useReservationForm } from "@/hooks/useReservationForm";
import { SuccessState } from "./SuccessState";
import { FormStepIndicator } from "./FormStepIndicator";

export function ReservationForm() {
  const {
    formData,
    setFormData,
    formErrors,
    formLoading,
    formSubmitted,
    isRedirecting,
    waUrlToOpen,
    validateField,
    handleFormSubmit,
    handleQuickWhatsAppInquiry,
    resetForm,
    setFormErrors
  } = useReservationForm();

  if (formSubmitted) {
    return (
      <SuccessState 
        formData={formData}
        isRedirecting={isRedirecting}
        waUrlToOpen={waUrlToOpen}
        onReset={resetForm}
      />
    );
  }

  return (
    <form id="reservasi" onSubmit={handleFormSubmit} className="space-y-6">
      <FormStepIndicator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5" id="form-name">
          <label htmlFor="client-name" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">Nama Lengkap Klien *</label>
          <input
            id="client-name"
            type="text"
            required
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 transition-colors ${
              formErrors.name ? "border-red-500 focus:ring-red-500 bg-red-50/10" : "border-stone-300 dark:border-stone-750 focus:ring-emerald-700 focus:border-emerald-700"
            }`}
            placeholder="Masukkan nama lengkapmu"
            value={formData.name}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, name: e.target.value }));
              validateField("name", e.target.value);
            }}
          />
          {formErrors.name && (
            <motion.span 
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold text-red-600 block px-1"
            >
              {formErrors.name}
            </motion.span>
          )}
        </div>

        <div className="space-y-1.5" id="form-phone">
          <label htmlFor="client-phone" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">Nomor HP / WhatsApp Terdaftar *</label>
          <input
            id="client-phone"
            type="tel"
            required
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 transition-colors ${
              formErrors.phone ? "border-red-500 focus:ring-red-500 bg-red-50/10" : "border-stone-300 dark:border-stone-750 focus:ring-emerald-700 focus:border-emerald-700"
            }`}
            placeholder="Contoh: 0812XXXXXXXX"
            value={formData.phone}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, phone: e.target.value }));
              validateField("phone", e.target.value);
            }}
          />
          {formErrors.phone && (
            <motion.span 
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold text-red-600 block px-1"
            >
              {formErrors.phone}
            </motion.span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5" id="form-email">
          <label htmlFor="client-email" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">Email Aktif (Opsional)</label>
          <input
            id="client-email"
            type="email"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 transition-colors ${
              formErrors.email ? "border-red-500 focus:ring-red-500 bg-red-50/10" : "border-stone-300 dark:border-stone-750 focus:ring-emerald-700 focus:border-emerald-700"
            }`}
            placeholder="alamat@email.com (Opsional)"
            value={formData.email}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, email: e.target.value }));
              validateField("email", e.target.value);
            }}
          />
          {formErrors.email && (
            <motion.span 
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold text-red-600 block px-1"
            >
              {formErrors.email}
            </motion.span>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="service-type" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">Pilih Layanan</label>
          <select
            id="service-type"
            className="w-full rounded-xl border border-stone-300 dark:border-stone-750 px-3 py-2.5 text-xs bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-stone-800 dark:text-stone-100"
            value={formData.serviceType}
            onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
          >
            <optgroup label="Layanan Konseling">
              <option value="Konseling Pendidikan (Online)">Konseling Pendidikan (Online)</option>
              <option value="Konseling Pendidikan (Tatap Muka)">Konseling Pendidikan (Tatap Muka)</option>
              <option value="Konseling Tumbuh Kembang Anak (Online)">Konseling Tumbuh Kembang Anak (Online)</option>
              <option value="Konseling Tumbuh Kembang Anak (Tatap Muka)">Konseling Tumbuh Kembang Anak (Tatap Muka)</option>
              <option value="Konseling Psikologi Remaja (Online)">Konseling Psikologi Remaja (Online)</option>
              <option value="Konseling Psikologi Remaja (Tatap Muka)">Konseling Psikologi Remaja (Tatap Muka)</option>
              <option value="Konseling Perkawinan/Keluarga (Online)">Konseling Perkawinan/Keluarga (Online)</option>
              <option value="Konseling Perkawinan/Keluarga (Tatap Muka)">Konseling Perkawinan/Keluarga (Tatap Muka)</option>
              <option value="Konseling Trauma Healing (Online)">Konseling Trauma Healing (Online)</option>
              <option value="Konseling Trauma Healing (Tatap Muka)">Konseling Trauma Healing (Tatap Muka)</option>
            </optgroup>
            <optgroup label="Tes Perorangan">
              <option value="Tes IQ Reguler (Perorangan)">Tes IQ Reguler</option>
              <option value="Tes IQ Lengkap (Perorangan)">Tes IQ Lengkap</option>
              <option value="Tes Anak Berkebutuhan Khusus (Perorangan)">Tes Anak Berkebutuhan Khusus</option>
              <option value="Tes Penelusuran Bakat Minat (Perorangan)">Tes Penelusuran Bakat Minat</option>
              <option value="Tes Penjurusan Sekolah & PT (Perorangan)">Tes Penjurusan Sekolah & PT</option>
              <option value="Tes Evaluasi Kepribadian (Perorangan)">Tes Evaluasi Kepribadian</option>
              <option value="Assessment Tenaga Pendidik (Perorangan)">Assessment Tenaga Pendidik</option>
              <option value="Assessment Perekrutan Pegawai (Perorangan)">Assessment Perekrutan Pegawai</option>
              <option value="Assessment Promosi Jabatan (Perorangan)">Assessment Promosi Jabatan</option>
            </optgroup>
            <optgroup label="Tes Klasikal / Kelompok">
              <option value="Tes IQ Reguler (Klasikal)">Tes IQ Reguler</option>
              <option value="Tes IQ Lengkap (Klasikal)">Tes IQ Lengkap</option>
              <option value="Tes Anak Berkebutuhan Khusus (Klasikal)">Tes Anak Berkebutuhan Khusus</option>
              <option value="Tes Penelusuran Bakat Minat (Klasikal)">Tes Penelusuran Bakat Minat</option>
              <option value="Tes Penjurusan Sekolah & PT (Klasikal)">Tes Penjurusan Sekolah & PT</option>
              <option value="Tes Evaluasi Kepribadian (Klasikal)">Tes Evaluasi Kepribadian</option>
              <option value="Assessment Tenaga Pendidik (Klasikal)">Assessment Tenaga Pendidik</option>
              <option value="Assessment Perekrutan Pegawai (Klasikal)">Assessment Perekrutan Pegawai</option>
              <option value="Assessment Promosi Jabatan (Klasikal)">Assessment Promosi Jabatan</option>
            </optgroup>
            <option value="Training Anak & Remaja">Training Anak & Remaja</option>
            <option value="Training Organisasi">Training Organisasi</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`space-y-1.5 ${!(formData.serviceType.startsWith("Konseling")) && formData.serviceType !== "Training Anak & Remaja" && formData.serviceType !== "Training Organisasi" && !formData.serviceType.startsWith("Tes ") && !formData.serviceType.startsWith("Assessment ") ? "sm:col-span-2" : ""}`} id="form-sessionDate">
          <label htmlFor="session-date" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
            {formData.serviceType === "Training Anak & Remaja" || formData.serviceType === "Training Organisasi"
              ? "Tanggal Pelaksanaan Training *"
              : formData.serviceType.startsWith("Tes ") || formData.serviceType.startsWith("Assessment ")
              ? "Tanggal Pelaksanaan Tes *"
              : "Rencana Tanggal Fleksibel"}
          </label>
          <input
            id="session-date"
            type="date"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 transition-colors [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:text-emerald-800 dark:[&::-webkit-calendar-picker-indicator]:invert ${
              formErrors.sessionDate ? "border-red-500 focus:ring-red-500 bg-red-50/10" : "border-stone-300 dark:border-stone-750 focus:ring-emerald-700"
            }`}
            value={formData.sessionDate}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, sessionDate: e.target.value }));
              validateField("sessionDate", e.target.value);
            }}
          />
          {formErrors.sessionDate && (
            <motion.span 
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold text-red-600 block px-1"
            >
              {formErrors.sessionDate}
            </motion.span>
          )}
        </div>

        {formData.serviceType.startsWith("Konseling") && (
          <div className="space-y-1.5">
            <label htmlFor="session-duration" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">Estimasi Jumlah Sesi</label>
            <select
              id="session-duration"
              className="w-full rounded-xl border border-stone-300 dark:border-stone-750 px-3 py-2.5 text-xs bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-stone-800 dark:text-stone-100"
              value={formData.sessionDuration}
              onChange={(e) => setFormData(prev => ({ ...prev, sessionDuration: e.target.value }))}
            >
              <option value="1 Sesi">1 Sesi Saja (Pemulihan Ringan)</option>
              <option value="3 Sesi">3 Sesi Sesi (Paket Hemat 5%)</option>
              <option value="5 Sesi">5 Sesi Sesi (Paket Intensif 10%)</option>
              <option value="Eksklusif Organisasi">Eksklusif Lembaga / Klasikal Kelompok</option>
            </select>
          </div>
        )}

        {(formData.serviceType === "Training Anak & Remaja" || formData.serviceType === "Training Organisasi" || formData.serviceType.startsWith("Tes ") || formData.serviceType.startsWith("Assessment ")) && (
          <div className="space-y-1.5" id="form-participants">
            <label htmlFor="participants-count" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">Estimasi Jumlah Peserta *</label>
            <input
              id="participants-count"
              type="number"
              min={1}
              required
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 transition-colors ${
                formErrors.participantsCount ? "border-red-500 focus:ring-red-500 bg-red-50/10" : "border-stone-300 dark:border-stone-750 focus:ring-emerald-700"
              }`}
              placeholder="Contoh: 30"
              value={formData.participantsCount || ""}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, participantsCount: val }));
                if (val && parseInt(val) > 0) {
                  setFormErrors(prev => {
                    const next = { ...prev };
                    delete next.participantsCount;
                    return next;
                  });
                } else {
                  setFormErrors(prev => ({ ...prev, participantsCount: "Jumlah peserta harus lebih dari 0" }));
                }
              }}
            />
            {formErrors.participantsCount && (
              <motion.span 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-bold text-red-600 block px-1"
              >
                {formErrors.participantsCount}
              </motion.span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="client-message" className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
          {formData.serviceType.startsWith("Konseling")
            ? "Catatan Keluhan Singkat (Opsional)"
            : "Catatan & Pesan Khusus (opsional)"}
        </label>
        <textarea
          id="client-message"
          rows={4}
          className="w-full rounded-xl border border-stone-300 dark:border-stone-750 px-3.5 py-2.5 text-xs bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-stone-800 dark:text-stone-100"
          placeholder={formData.serviceType.startsWith("Konseling")
            ? "Tuliskan gambaran singkat tantangan tumbuh kembang anak atau beban emosimu..."
            : "Tuliskan catatan atau pesan khusus Anda di sini..."}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        />
      </div>

      <div className="space-y-1.5" id="form-agreeTerms">
        <div className="flex items-start space-x-2 pt-2">
          <input
            type="checkbox"
            id="agree"
            className={`h-4 w-4 rounded border text-emerald-800 focus:ring-emerald-700 mt-0.5 cursor-pointer dark:bg-stone-900 ${
              formErrors.agreeTerms ? "border-red-500" : "border-stone-300 dark:border-stone-700"
            }`}
            checked={formData.agreeTerms}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }));
              validateField("agreeTerms", e.target.checked);
            }}
          />
          <label htmlFor="agree" className="text-[11px] text-stone-750 dark:text-stone-300 leading-tight cursor-pointer">
            Saya menyetujui seluruh data bimbingan dijamin kerahasiaan penuh oleh Nuansa Psychology Consulting sesuai dengan Kode Etik HIMPSI Indonesia. *
          </label>
        </div>
        {formErrors.agreeTerms && (
          <motion.span 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-red-600 block px-1"
          >
            {formErrors.agreeTerms}
          </motion.span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <PrimaryButton
          type="submit"
          disabled={formLoading}
          className={formLoading ? "cursor-wait" : ""}
        >
          {formLoading ? (
            <div className="flex items-center space-x-3">
              <LoadingCylinder />
              <span className="animate-pulse">Memproses Data...</span>
            </div>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              <span>Kirim Reservasi</span>
            </>
          )}
        </PrimaryButton>

        <SecondaryButton
          type="button"
          onClick={handleQuickWhatsAppInquiry}
        >
          <MessageCircle className="h-4 w-4 text-emerald-700 mr-2 animate-pulse" />
          <span>Tanya Cepat via Whatsapp</span>
        </SecondaryButton>
      </div>
    </form>
  );
}
