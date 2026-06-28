"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Shield, CheckCircle } from "lucide-react";
import { ScrollReveal, RollingNumber } from "@/components/ui/Animations";
import { BestValueBadge } from "@/components/ui/Misc";

interface TestType {
  id: string;
  name: string;
  individualPrice: number;
  classicalPrice: number;
}

const TEST_TYPES: TestType[] = [
  { id: "iq_reguler", name: "Tes IQ Reguler", individualPrice: 250000, classicalPrice: 125000 },
  { id: "iq_lengkap", name: "Tes IQ Lengkap", individualPrice: 450000, classicalPrice: 200000 },
  { id: "abk", name: "Tes Anak Berkebutuhan Khusus", individualPrice: 350000, classicalPrice: 200000 },
  { id: "bakat_minat", name: "Tes Penelusuran Bakat Minat", individualPrice: 450000, classicalPrice: 250000 },
  { id: "penjurusan", name: "Tes Penjurusan Sekolah & PT", individualPrice: 450000, classicalPrice: 250000 },
  { id: "kepribadian", name: "Tes Evaluasi Kepribadian", individualPrice: 550000, classicalPrice: 250000 },
  { id: "assessment_pendidik", name: "Assessment Tenaga Pendidik", individualPrice: 450000, classicalPrice: 250000 },
  { id: "assessment_pegawai", name: "Assessment Perekrutan Pegawai", individualPrice: 450000, classicalPrice: 250000 },
  { id: "assessment_jabatan", name: "Assessment Promosi Jabatan", individualPrice: 600000, classicalPrice: 350000 },
];

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function CostCalculatorSection() {
  const router = useRouter();
  const [category, setCategory] = useState<"konseling" | "perorangan" | "klasikal" | "training_anak" | "training_organisasi">("konseling");
  const [selectedCounselingType, setSelectedCounselingType] = useState<string>("pendidikan");
  const [counselingMethod, setCounselingMethod] = useState<"online" | "offline">("online");
  const [selectedTestId, setSelectedTestId] = useState<string>("iq_reguler");
  const [participants, setParticipants] = useState<number>(1);

  // Sesi / peserta count is set directly in the category switcher buttons to avoid triggering linter warning about setState inside effects.

  const getMinParticipants = () => {
    if (category === "konseling") return 1;
    if (category === "perorangan") return 1;
    if (category === "klasikal") return 20;
    if (category === "training_anak") return 60;
    if (category === "training_organisasi") return 30;
    return 1;
  };

  const getStep = () => {
    if (category === "konseling" || category === "perorangan") return 1;
    return 5;
  };

  const getUnitPrice = () => {
    if (category === "training_organisasi") return 0;
    if (category === "training_anak") return 100000;
    if (category === "konseling") {
      return counselingMethod === "online" ? 250000 : 350000;
    }
    const test = TEST_TYPES.find((t) => t.id === selectedTestId) || TEST_TYPES[0];
    return category === "perorangan" ? test.individualPrice : test.classicalPrice;
  };

  const getCalculatedPrice = () => {
    if (category === "training_organisasi") {
      return 0;
    }
    const unitPrice = getUnitPrice();
    const qty = Math.max(getMinParticipants(), participants);
    return unitPrice * qty;
  };

  const calculatedTotal = getCalculatedPrice();
  const selectedTest = TEST_TYPES.find((t) => t.id === selectedTestId) || TEST_TYPES[0];

  const handleAmbilPaket = (e: React.MouseEvent) => {
    e.preventDefault();
    let serviceTypeLabel = "";
    let sessionDurationLabel = `${participants} Orang`;

    if (category === "konseling") {
      const typeLabel = {
        pendidikan: "Pendidikan",
        anak: "Tumbuh Kembang Anak",
        remaja: "Psikologi Remaja",
        keluarga: "Perkawinan/Keluarga",
        trauma: "Trauma Healing",
      }[selectedCounselingType] || "Pendidikan";
      serviceTypeLabel = `Konseling ${typeLabel} (${counselingMethod === "online" ? "Online" : "Tatap Muka"})`;
      sessionDurationLabel = `${participants} Sesi`;
    } else if (category === "perorangan") {
      serviceTypeLabel = `Tes Perorangan: ${selectedTest.name}`;
      sessionDurationLabel = `${participants} Orang`;
    } else if (category === "klasikal") {
      serviceTypeLabel = `Psikotes Klasikal: ${selectedTest.name}`;
      sessionDurationLabel = `${participants} Orang`;
    } else if (category === "training_anak") {
      serviceTypeLabel = "Training Anak & Remaja";
      sessionDurationLabel = `${participants} Orang`;
    } else if (category === "training_organisasi") {
      serviceTypeLabel = "Training Organisasi";
      sessionDurationLabel = `${participants} Orang`;
    }

    const serviceEncoded = encodeURIComponent(serviceTypeLabel);
    const durationEncoded = encodeURIComponent(sessionDurationLabel);
    const pCountEncoded = encodeURIComponent(String(participants));
    router.push(`/reservasi?service=${serviceEncoded}&duration=${durationEncoded}&participants=${pCountEncoded}`);
  };

  return (
    <SectionWrapper 
      className="bg-stone-50 dark:bg-[#121211]"
      badge="Transparansi Finansial"
      title="Investasi Terjangkau untuk Setiap Kebutuhan"
      description="Simulasikan biaya layanan psikologi dan pelatihan secara transparan. Dapatkan penawaran harga terbaik yang disesuaikan dengan kebutuhanmu."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Interactive Selector Board */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm p-6 lg:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Select Service Component */}
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold text-stone-900 dark:text-white block tracking-wider uppercase">
                    1. Pilih Kategori Layanan
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => { setCategory("konseling"); setParticipants(1); }}
                      className={`p-4 rounded-xl border transition text-left flex flex-col justify-between cursor-pointer md:col-span-2 ${
                        category === "konseling"
                          ? "border-emerald-700 bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 shadow-inner"
                          : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 hover:border-stone-300 dark:hover:border-stone-750 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="text-xs md:text-sm font-bold">Layanan Konseling</span>
                        <span className="text-[9px] md:text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-850 dark:text-emerald-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Terpopuler</span>
                      </div>
                      <span className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Pendidikan, Tumbuh Kembang, Remaja, Perkawinan/Keluarga, & Trauma Healing (Mulai Rp 250.000,-)
                      </span>
                    </button>

                    <button
                      onClick={() => { setCategory("perorangan"); setParticipants(1); }}
                      className={`p-4 rounded-xl border transition text-left flex flex-col justify-between cursor-pointer ${
                        category === "perorangan"
                          ? "border-emerald-700 bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 shadow-inner"
                          : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 hover:border-stone-300 dark:hover:border-stone-750 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span className="text-xs md:text-sm font-bold">Tes Perorangan / Individu</span>
                      <span className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Sesi evaluasi perorangan mulai Rp 250.000,-
                      </span>
                    </button>

                    <button
                      onClick={() => { setCategory("klasikal"); setParticipants(20); }}
                      className={`p-4 rounded-xl border transition text-left flex flex-col justify-between cursor-pointer ${
                        category === "klasikal"
                          ? "border-emerald-700 bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 shadow-inner"
                          : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 hover:border-stone-300 dark:hover:border-stone-750 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span className="text-xs md:text-sm font-bold">Tes Klasikal / Kelompok</span>
                      <span className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Minimal 20 orang peserta. Harga hemat kelompok.
                      </span>
                    </button>

                    <button
                      onClick={() => { setCategory("training_anak"); setParticipants(60); }}
                      className={`p-4 rounded-xl border transition text-left flex flex-col justify-between cursor-pointer ${
                        category === "training_anak"
                          ? "border-emerald-700 bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 shadow-inner"
                          : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 hover:border-stone-300 dark:hover:border-stone-750 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span className="text-xs md:text-sm font-bold">Training Anak & Remaja</span>
                      <span className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Minimal 60 orang peserta. Rp 100.000 / orang.
                      </span>
                    </button>

                    <button
                      onClick={() => { setCategory("training_organisasi"); setParticipants(30); }}
                      className={`p-4 rounded-xl border transition text-left flex flex-col justify-between cursor-pointer ${
                        category === "training_organisasi"
                          ? "border-emerald-700 bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 shadow-inner"
                          : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 hover:border-stone-300 dark:hover:border-stone-750 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span className="text-xs md:text-sm font-bold">Training Organisasi</span>
                      <span className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Minimal 30 orang peserta. Hubungi untuk harga khusus.
                      </span>
                    </button>
                  </div>
                </div>

                {/* Select Counseling Type Component (Only shown for konseling) */}
                {category === "konseling" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-stone-900 dark:text-white block tracking-wider uppercase">
                        2. Pilih Topik Konseling
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCounselingType}
                          onChange={(e) => setSelectedCounselingType(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
                        >
                          <option value="pendidikan" className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">Konseling Pendidikan</option>
                          <option value="anak" className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">Konseling Tumbuh Kembang Anak</option>
                          <option value="remaja" className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">Konseling Psikologi Remaja</option>
                          <option value="keluarga" className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">Konseling Perkawinan / Keluarga</option>
                          <option value="trauma" className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">Konseling Trauma Healing</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-stone-900 dark:text-white block tracking-wider uppercase">
                        3. Pilih Metode Sesi
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setCounselingMethod("online")}
                          type="button"
                          className={`p-3 rounded-xl border text-center transition cursor-pointer text-xs md:text-sm font-bold ${
                            counselingMethod === "online"
                              ? "border-emerald-700 bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 shadow-inner"
                              : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          Online (Rp 250k/sesi)
                        </button>
                        <button
                          onClick={() => setCounselingMethod("offline")}
                          type="button"
                          className={`p-3 rounded-xl border text-center transition cursor-pointer text-xs md:text-sm font-bold ${
                            counselingMethod === "offline"
                              ? "border-emerald-700 bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-300 shadow-inner"
                              : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          Tatap Muka (Rp 350k/sesi)
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Select Test Type Component (Only shown for perorangan and klasikal) */}
                {(category === "perorangan" || category === "klasikal") && (
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-stone-900 dark:text-white block tracking-wider uppercase">
                      2. Pilih Jenis Tes Psikologi
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTestId}
                        onChange={(e) => setSelectedTestId(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
                      >
                        {TEST_TYPES.map((t) => (
                          <option key={t.id} value={t.id} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">
                            {t.name} ({category === "perorangan" ? "Rp " + t.individualPrice.toLocaleString("id-ID") : "Rp " + t.classicalPrice.toLocaleString("id-ID")}/org)
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Participant / Session Counter */}
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold text-stone-900 dark:text-white block tracking-wider uppercase">
                    {category === "konseling" ? "4. Atur Jumlah Sesi Konseling" : category === "perorangan" ? "2. Atur Jumlah Peserta" : "3. Atur Jumlah Peserta / Klien"}
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center space-x-1 border border-stone-300 dark:border-stone-800 rounded-xl overflow-hidden bg-stone-50 dark:bg-stone-950 self-start">
                      <button
                        onClick={() => setParticipants(Math.max(getMinParticipants(), participants - getStep()))}
                        type="button"
                        className="p-3 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition cursor-pointer"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-20 text-center text-sm font-bold text-stone-800 dark:text-white">
                        <RollingNumber value={participants} /> {category === "konseling" ? "Sesi" : "Orang"}
                      </span>
                      <button
                        onClick={() => setParticipants(participants + getStep())}
                        type="button"
                        className="p-3 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-[11px] md:text-xs text-stone-500 dark:text-stone-400 leading-tight">
                      {category === "konseling" && "* Sesi konseling mendalam, privat, dan rahasia terjamin."}
                      {category === "perorangan" && "* Kuota fleksibel untuk individu maupun keluarga kecil."}
                      {category === "klasikal" && "* Layanan Klasikal mewajibkan batas minimum 20 peserta."}
                      {category === "training_anak" && "* Layanan Training Anak & Remaja mewajibkan batas minimum 60 peserta."}
                      {category === "training_organisasi" && "* Layanan Training Organisasi mewajibkan batas minimum 30 peserta."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-150 dark:border-stone-800 flex items-center space-x-2 text-stone-500 dark:text-stone-400 text-[11px]">
                <Shield className="h-4 w-4 text-emerald-800 dark:text-emerald-400 shrink-0" />
                <span>Seluruh estimasi biaya transparan sesuai rincian tarif layanan resmi Nuansa Psychology Consulting.</span>
              </div>
            </div>

            {/* Total Display Board */}
            <div className="lg:col-span-5 bg-stone-950 rounded-2xl p-6 lg:p-8 text-stone-50 flex flex-col justify-between border border-stone-900 shadow-xl">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 font-mono">
                  Estimasi Investasi Kesehatan
                </span>

                {category === "training_organisasi" ? (
                  <div className="space-y-2">
                    <span className="text-xl lg:text-2xl font-extrabold text-white block leading-tight">
                      Hubungi Nuansa biaya layanan
                    </span>
                    <span className="text-xs text-stone-400 block">
                      Silakan hubungi admin kami untuk penawaran harga kustom khusus organisasi/korporat.
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xs text-stone-400 mr-0.5">Rp</span>
                      <div className="flex items-center">
                        <div className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white inline-block">
                          <RollingNumber value={calculatedTotal} />
                        </div>
                        <BestValueBadge
                          show={
                            (category === "klasikal" && participants >= 50) ||
                            (category === "training_anak" && participants >= 100)
                          }
                        />
                      </div>
                    </div>
                    <span className="text-xs text-stone-400 mt-1 block">
                      Untuk {participants} {category === "konseling" ? "Sesi" : "Orang"} ({
                        category === "konseling" 
                          ? `Konseling ${
                              {
                                pendidikan: "Pendidikan",
                                anak: "Tumbuh Kembang Anak",
                                remaja: "Psikologi Remaja",
                                keluarga: "Perkawinan/Keluarga",
                                trauma: "Trauma Healing"
                              }[selectedCounselingType] || "Pendidikan"
                            }`
                          : category === "training_anak" 
                            ? "Training Anak/Remaja" 
                            : selectedTest.name
                      })
                    </span>
                  </div>
                )}

                <div className="border-t border-stone-850 pt-6 space-y-4 font-sans">
                  <span className="text-xs md:text-sm font-bold text-emerald-400 block uppercase tracking-wider">
                    Layanan Termasuk Benefits:
                  </span>
                  <div className="space-y-2.5 text-xs md:text-sm text-stone-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>Pelaporan Psikogram Resmi / Sertifikat Terkait</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>Sesi Dilakukan oleh Psikolog Profesional & SIPP Terdaftar</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>Alat Tes Psikologi Standar Internasional</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>Laporan Komprehensif Hasil Evaluasi Kejiwaan</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <a
                  href="/reservasi"
                  onClick={handleAmbilPaket}
                  className="block w-full text-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-stone-50 py-3.5 text-xs font-bold shadow-md transition"
                >
                  {category === "training_organisasi" ? "Hubungi Admin via Formulir" : "Ambil Paket & Hubungkan Kontak"}
                </a>
                <p className="text-[10px] text-stone-400 text-center">
                  * Estimasi Biaya Bersih (Nett). Konfirmasi jadwal & administrasi resmi via WhatsApp resmi kami.
                </p>
              </div>
            </div>
      </div>
    </SectionWrapper>
  );
}
