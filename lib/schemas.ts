import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  phone: z.string().regex(/^(?:\+62|08)[0-9][0-9]{7,12}$/, "Format nomor WhatsApp tidak valid (contoh: 0812...)"),
  serviceType: z.string().min(1, "Silakan pilih jenis pilar layanan"),
  sessionDate: z.string().min(1, "Silakan pilih tanggal janji temu"),
  sessionDuration: z.string().optional(),
  participantsCount: z.string().optional(),
  message: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, "Kamu harus menyetujui syarat & ketentuan"),
}).superRefine((data, ctx) => {
  const isTraining = data.serviceType === "Training Anak & Remaja" || data.serviceType === "Training Organisasi";
  const isTest = data.serviceType.startsWith("Tes ") || data.serviceType.startsWith("Assessment ");
  
  if (isTraining || isTest) {
    if (!data.participantsCount || parseInt(data.participantsCount) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Jumlah peserta harus diisi dan lebih dari 0",
        path: ["participantsCount"],
      });
    }
  }
});

export type ReservationData = z.infer<typeof reservationSchema>;

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  sessionDate?: string;
  agreeTerms?: string;
  [key: string]: string | undefined;
}
