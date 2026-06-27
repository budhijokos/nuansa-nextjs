"use client";

import { useState, useEffect, useCallback } from "react";
import * as z from "zod";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { 
  reservationSchema, 
  ReservationData, 
  FormErrors 
} from "@/lib/schemas";

export function useReservationForm() {
  const [formData, setFormData] = useState<ReservationData>({
    name: "",
    email: "",
    phone: "",
    serviceType: "Konseling Pendidikan (Tatap Muka)",
    sessionDate: "",
    sessionDuration: "1 Sesi",
    message: "",
    agreeTerms: false,
    participantsCount: "10"
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [waUrlToOpen, setWaUrlToOpen] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Handle URL parameters for pre-filling
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const service = params.get("service");
      const message = params.get("message");
      const duration = params.get("duration");
      const participants = params.get("participants");

      if (service || message || duration || participants) {
        setFormData(prev => ({
          ...prev,
          serviceType: service ? decodeURIComponent(service) : prev.serviceType,
          message: message ? decodeURIComponent(message) : prev.message,
          sessionDuration: duration ? decodeURIComponent(duration) : prev.sessionDuration,
          participantsCount: participants ? decodeURIComponent(participants) : prev.participantsCount,
          agreeTerms: true
        }));
      }
    }
  }, []);

  const validateField = useCallback((name: string, value: any) => {
    try {
      // @ts-ignore - dynamic key access
      const fieldSchema = reservationSchema.pick({ [name]: true });
      fieldSchema.parse({ [name]: value });
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setFormErrors(prev => ({
          ...prev,
          [name]: err.issues[0].message
        }));
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      reservationSchema.parse(formData);
      setFormErrors({});
      setFormLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormLoading(false);
      setFormSubmitted(true);
      setIsRedirecting(true);
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#065f46', '#059669', '#34d399', '#fbbf24', '#f59e0b']
      });

      const waMessage = formatWAMessage(formData);
      const encodedText = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/628128453550?text=${encodedText}`;
      setWaUrlToOpen(waUrl);

      setTimeout(() => {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }, 2200);

    } catch (err) {
      setFormLoading(false);
      if (err instanceof z.ZodError) {
        const errors: FormErrors = {};
        err.issues.forEach((e) => {
          if (e.path[0]) {
            errors[e.path[0] as keyof FormErrors] = e.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };

  const handleQuickWhatsAppInquiry = () => {
    const waMessage = formatQuickInquiryMessage(formData);
    const encodedText = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/628128453550?text=${encodedText}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "Konseling Pendidikan (Tatap Muka)",
      sessionDate: "",
      sessionDuration: "1 Sesi",
      message: "",
      agreeTerms: false,
      participantsCount: "10"
    });
    setFormSubmitted(false);
    setIsRedirecting(false);
  };

  return {
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
  };
}

function formatWAMessage(data: ReservationData) {
  const isCounseling = data.serviceType.startsWith("Konseling");
  const needsParticipants = data.serviceType === "Training Anak & Remaja" || 
                           data.serviceType === "Training Organisasi" || 
                           data.serviceType.startsWith("Tes ") || 
                           data.serviceType.startsWith("Assessment ");

  let detailLines = "";
  if (needsParticipants) {
    detailLines = `\n- *Tanggal Pelaksanaan:* ${data.sessionDate}\n- *Jumlah Peserta:* ${data.participantsCount} orang`;
  } else {
    detailLines = `\n- *Rencana Tanggal:* ${data.sessionDate}`;
  }
  if (isCounseling && data.sessionDuration) {
    detailLines += `\n- *Estimasi Sesi:* ${data.sessionDuration}`;
  }

  const notesLabel = isCounseling ? "Catatan Keluhan" : "Catatan & Pesan Khusus";

  return `*RESERVASI JADWAL BARU*
==========================
Halo Admin Nuansa, saya ingin menjadwalkan sesi pertemuan baru melalui formulir website khusus.

- *Nama:* ${data.name}
- *WhatsApp:* ${data.phone}
${data.email ? `- *Email:* ${data.email}\n` : ""}- *Layanan:* ${data.serviceType}${detailLines}
- *${notesLabel}:* "${data.message || "-"}"
==========================
Sent from Nuansa Psychology Consulting portal.`;
}

function formatQuickInquiryMessage(data: ReservationData) {
  const isCounseling = data.serviceType.startsWith("Konseling");
  const isTraining = data.serviceType === "Training Anak & Remaja" || data.serviceType === "Training Organisasi";
  const isTest = data.serviceType.startsWith("Tes ") || data.serviceType.startsWith("Assessment ");
  const needsParticipants = isTraining || isTest;

  let infoLines = "";
  if (data.name) infoLines += `\n- *Nama:* ${data.name}`;
  if (data.phone) infoLines += `\n- *WhatsApp:* ${data.phone}`;
  if (data.email) infoLines += `\n- *Email:* ${data.email}`;
  if (data.sessionDate) {
    infoLines += needsParticipants ? `\n- *Tanggal Pelaksanaan:* ${data.sessionDate}` : `\n- *Rencana Tanggal:* ${data.sessionDate}`;
  }
  if (isCounseling && data.sessionDuration) infoLines += `\n- *Estimasi Sesi:* ${data.sessionDuration}`;
  if (needsParticipants && data.participantsCount) infoLines += `\n- *Jumlah Peserta:* ${data.participantsCount} orang`;
  if (data.message) {
    infoLines += isCounseling ? `\n- *Catatan Keluhan:* "${data.message}"` : `\n- *Catatan & Pesan Khusus:* "${data.message}"`;
  }

  return `*TANYA CEPAT - PILAR LAYANAN*
==========================
Halo Admin Nuansa, saya ingin menanyakan lebih lanjut mengenai pilar layanan berikut:

*Pilar Layanan:* ${data.serviceType}${infoLines ? `\n\n*Informasi Sesi:*${infoLines}` : ""}
==========================
Mohon bantuannya untuk info jadwal terdekat dan penanganan. Terima kasih!`;
}
