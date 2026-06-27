"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HelpCircle, ClipboardList, Award, CheckCircle2, Info, RotateCcw } from "lucide-react";

interface QuizQuestion {
  question: string;
  category: string;
}

const QUIZ_DATA: Record<string, { questions: QuizQuestion[]; advice: string }> = {
  "mengelola-burnout-tekanan-kerja": {
    questions: [
      { question: "Apakah Anda merasa lelah luar biasa secara fisik dan emosional bahkan sebelum memulai pekerjaan di pagi hari?", category: "exhaustion" },
      { question: "Apakah Anda mulai bersikap sinis, kesal, atau memiliki jarak mental yang jauh dari urusan kantor akhir-akhir ini?", category: "cynicism" },
      { question: "Apakah Anda merasa kinerja dan produktivitas Anda merugi drastis karena hilangnya semangat kerja?", category: "inefficiency" }
    ],
    advice: "Skor Anda menunjukkan indikasi kelelahan kerja (burnout). Pesan Psikolog: Cobalah mengambil jarak sejenak dari dinamika kantor di luar jam kerja dengan menetapkan 'Digital Sunset'. Jangan paksakan diri Anda untuk menyelesaikan semua hal secara instan. Menyayangi kapasitas diri adalah langkah heroisme sejati."
  },
  "komunikasi-asertif-keluarga": {
    questions: [
      { question: "Apakah Anda sering memendam ketidaknyamanan batin demi menjaga kerukunan semu, lalu meledak di waktu sesudahnya?", category: "passive" },
      { question: "Apakah Anda sering menggunakan kata-kata bernada menyudutkan atau mengkritik pasangan saat sedang berargumen?", category: "aggressive" },
      { question: "Apakah Anda mendapati diri Anda menuntut orang lain memahami pikiran Anda secara langsung tanpa Anda utarakan secara jelas?", category: "indirect" }
    ],
    advice: "Pesan Psikolog: Komunikasi yang harmonis bertumpu pada keberanian mengungkapkan batin secara asertif. Cobalah ganti kalimat tuduhan menjadi 'I-Statement'. Misal: 'Ayah merasa kesepian saat ibu asyik dengan ponselnya', ketimbang 'Kamu selalu bermain ponsel!'."
  },
  "menghargai-emosi-negatif": {
    questions: [
      { question: "Apakah Anda menganggap diri Anda lemah atau bersalah saat merasakan luapan emosi sedih, takut, atau amarah?", category: "suppression" },
      { question: "Apakah Anda memaksakan diri tersenyum atau berpikir positif di depan orang lain meskipun hati Anda sedang berantakan?", category: "toxic" },
      { question: "Apakah emosi sedih yang Anda abaikan sering kali berubah wujud menjadi kemarahan hebat yang sulit dikendalikan?", category: "eruptive" }
    ],
    advice: "Pesan Psikolog: Emosi negatif adalah sinyal alami pelindung batin, bukan musuh yang mesti ditumpas. Ketika emosi berkawan dengan pengakuan santun, ia kehilangan hasrat jahatnya. Ambil waktu sejenak untuk mempraktikkan pengakuan emosional tanpa penghakiman."
  },
  "membangun-boundaries-sehat": {
    questions: [
      { question: "Apakah Anda merasa bertanggung jawab penuh atas kebahagiaan dan kenyamanan emosional semua orang di sekitar Anda?", category: "pleasing" },
      { question: "Apakah rasa bersalah selalu mendera Anda secara akut setiap kali Anda menolak permintaan dari kerabat atau teman kerja?", category: "guilt" },
      { question: "Apakah Anda sering merasa terbebani dan dieksploitasi oleh rekan kerja atau kerabat karena tidak sanggup berkata tidak?", category: "exhaustion" }
    ],
    advice: "Pesan Psikolog: Boundaries adalah kawat pengaman ketenangan batin Anda, bukan pagar pembatas kebencian. Mengatakan 'tidak' kepada orang lain sering kali merupakan wujud ucapan 'ya' yang tulus kepada perlindungan energi kreatif batin Anda sendiri."
  },
  "psikologi-pola-asuh-positif": {
    questions: [
      { question: "Apakah Anda terbiasa memarahi atau memberi cap negatif pada anak sebelum menanyakan latar belakang perilakunya?", category: "impulsive" },
      { question: "Apakah Anda merasa sangat tertekan dan malu di depan publik saat anak mengalami ledakan emosi atau tantrum?", category: "shame" },
      { question: "Apakah Anda merasa kesulitan meluangkan waktu 10 menit saja tanpa gawai untuk terhubung penuh secara hangat dengan anak?", category: "distracted" }
    ],
    advice: "Pesan Psikolog: Maafkan diri Anda jika sempat lepas kendali. Latih teknik jeda 'Pause' 3 detik sebelum Anda merespons tantrum anak. Saat Anda merespons dengan kendali diri yang tenang, Anda sedang mentransfer energi regulasi emosional yang damai kepada sirkuit syaraf anak."
  },
  "memutus-rantai-overthinking": {
    questions: [
      { question: "Apakah Anda menghabiskan jam tidur malam dengan memutar ulang kesalahan percakapan kecil atau peristiwa masa lalu?", category: "rumination" },
      { question: "Apakah Anda kerap menyusun skenario-skenario mimpi buruk 'bagaimana jika...' untuk masa depan yang belum tentu terjadi?", category: "projection" },
      { question: "Apakah Anda mencemaskan dan menganalisis makna tersirat yang berlebihan dari pesan singkat atau respons dingin orang lain?", category: "hypersensitivity" }
    ],
    advice: "Pesan Psikolog: Pikiran cemas Anda ingin melindungi Anda, namun ia kerap berlebihan menafsir ancaman. Tuliskan kekhawatiran itu pada selembar kertas selama 'Worry Time' khusus (15 menit). Memindahkan badai pikiran abstrak ke media fisik kertas terbukti merelaksasi sirkuit stres otak."
  },
  "meditasi-lima-menit": {
    questions: [
      { question: "Apakah Anda merasa hari Anda berjalan seperti mode pilot otomatis tanpa benar-benar merasai makanan atau tarikan napas Anda?", category: "autopilot" },
      { question: "Apakah Anda merasa tidak betah atau terusik mendengarkan sunyi dalam waktu 2 menit saja tanpa menyentuh layar gawai?", category: "restlessness" },
      { question: "Apakah Anda mendapati diri Anda kerap tergesa-gesa berpindah dari satu rutinitas ke rutinitas lain tanpa istirahat?", category: "rushing" }
    ],
    advice: "Pesan Psikolog: Kehidupan tidak hanya terjadi di garis finis, namun di sepanjang langkah yang Anda pijak sekarang. Ambil 1 menit duduk diam, rasakan detak jantung, dan katakan dalam hati: 'Saya berada di sini sekarang, dan saya aman'. Ini adalah meditasi paling murni."
  },
  "menjaga-keintiman-pernikahan": {
    questions: [
      { question: "Apakah interaksi harian Anda dengan pasangan hampir seluruhnya diisi urusan logistik, keuangan, atau tugas anak saja?", category: "logistic" },
      { question: "Apakah Anda merasakan kehadiran pasangan di sisi Anda namun terasa hampa atau sepi bagai tinggal bersama teman indekos?", category: "distancing" },
      { question: "Apakah Anda sudah jarang mengekspresikan pelukan hangat, usapan kecil, atau ciuman kasih sayang yang tulus padanya?", category: "physical" }
    ],
    advice: "Pesan Psikolog: Menurunnya energi asmara seiring pertambahan usia pernikahan adalah hal alamiah dari neurobiologis. Bangkitkan ikatan emosional (oksitosin) lewat apresiasi verbal yang spesifik. Sampaikan terima kasih atas kebaikan sederhana harian yang ia lakukan."
  },
  "seni-bangkit-dari-kegagalan": {
    questions: [
      { question: "Apakah Anda kerap memberi hukuman mental pada diri sendiri saat gagal, seolah kegagalan adalah pembukti kebodohan permanen?", category: "blaming" },
      { question: "Apakah Anda menolak mencoba mengambil tantangan baru karena bayang-bayang ketakutan akan kegagalan masa lalu?", category: "avoidance" },
      { question: "Apakah kritik di dalam kepala Anda (inner critic) menyuarakan kata-kata kasar yang tidak sudi Anda katakan pada teman Anda sendiri?", category: "hostility" }
    ],
    advice: "Pesan Psikolog: Kegagalan bukanlah penanda final kualitas jati diri Anda, melainkan umpan balik semata. Belajarlah memperlakukan diri sendiri dengan kehangatan lembut (self-compassion) selayaknya merangkul sahabat terdekat Anda saat ia terluka."
  },
  "tidur-dan-stabilitas-emosi": {
    questions: [
      { question: "Apakah Anda sering terbangun dengan suasana hati yang buruk, gampang kesal, dan merasa kehabisan motivasi?", category: "morning_mood" },
      { question: "Apakah Anda memiliki kebiasaan mengecek media sosial atau membalas pesan teks di tempat tidur menjelang jam pejam malam?", category: "screens_at_night" },
      { question: "Apakah Anda mengalami insomnia atau gangguan cemas yang intens tepat saat kepala berbaring di bantal tidur?", category: "sleep_anxiety" }
    ],
    advice: "Pesan Psikolog: Higienitas tidur berpengaruh langsung pada ketenangan amigdala otak. Terapkan ritual matikan layar gawai 60 menit sebelum tidur, ganti dengan membaca buku fisik, mendengar audio menenangkan, atur pencahayaan redup hangat, dan biarkan sirkuit otak melunak."
  }
};

export function SelfReflectionQuiz({ slug }: { slug: string }) {
  const data = QUIZ_DATA[slug];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  // Restart State
  useEffect(() => {
    setAnswers({});
    setShowResult(false);
  }, [slug]);

  if (!data) return null;

  const handleSelectOption = (qIdx: number, val: number) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: val }));
  };

  const isQuizComplete = Object.keys(answers).length === data.questions.length;

  const handleGetResult = () => {
    if (isQuizComplete) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  const getOptionStyle = (qIdx: number, level: number) => {
    const isSelected = answers[qIdx] === level;
    if (isSelected) {
      if (level === 2) return "bg-emerald-800 border-emerald-800 text-white shadow-sm";
      if (level === 1) return "bg-stone-800 border-stone-800 text-white shadow-sm dark:bg-stone-750 dark:border-stone-700";
      return "bg-stone-500 border-stone-500 text-white shadow-sm";
    }
    return "bg-stone-50 hover:bg-stone-100 dark:bg-stone-900/60 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-800/80";
  };

  return (
    <div className="my-12 p-8 rounded-[2.5rem] bg-stone-50 dark:bg-[#151514] border border-stone-200/80 dark:border-stone-850 space-y-8 relative overflow-hidden text-stone-850 dark:text-stone-200 no-print">
      {/* Quiz accent graphic */}
      <div className="absolute top-0 right-0 w-24 h-24 text-stone-200/40 dark:text-stone-800/10 pointer-events-none translate-x-4 -translate-y-4">
        <HelpCircle className="w-full h-full" />
      </div>

      <div className="flex items-center space-x-3 pb-4 border-b border-stone-200 dark:border-stone-850">
        <div className="h-10 w-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/45 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-center text-emerald-800 dark:text-emerald-400 shrink-0">
          <ClipboardList className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block font-mono">Psiko-Refleksi</span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-none mt-0.5">Ruang Refleksi Pendek</h3>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed italic">
            Ambil 1 menit untuk bercermin jujur pada diri Anda sendiri. Berikan jawaban yang merepresentasikan kondisi Anda dalam 2 minggu terakhir.
          </p>

          <div className="space-y-6">
            {data.questions.map((item, qIdx) => (
              <div key={qIdx} className="space-y-3">
                <p className="text-stone-800 dark:text-stone-100 text-sm font-medium leading-relaxed">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold mr-1.5">{qIdx + 1}.</span>
                  {item.question}
                </p>

                {/* Option Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSelectOption(qIdx, 2)}
                    className={`h-11 rounded-xl text-xs font-bold border transition-all ${getOptionStyle(qIdx, 2)}`}
                  >
                    Ya, Sering
                  </button>
                  <button
                    onClick={() => handleSelectOption(qIdx, 1)}
                    className={`h-11 rounded-xl text-xs font-bold border transition-all ${getOptionStyle(qIdx, 1)}`}
                  >
                    Kadang-kadang
                  </button>
                  <button
                    onClick={() => handleSelectOption(qIdx, 0)}
                    className={`h-11 rounded-xl text-xs font-bold border transition-all ${getOptionStyle(qIdx, 0)}`}
                  >
                    Jarang
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleGetResult}
              disabled={!isQuizComplete}
              className={`w-full md:w-auto px-8 h-12 rounded-full text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md cursor-pointer ${
                isQuizComplete
                  ? "bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-950 dark:hover:bg-emerald-600 text-white shadow-emerald-950/20 active:scale-95"
                  : "bg-stone-200 dark:bg-stone-850 text-stone-400 dark:text-stone-500 border border-stone-300 dark:border-stone-800 shadow-none cursor-not-allowed"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Lihat Rekomendasi Psikolog</span>
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a1a19] border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-md"
        >
          <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-450 shrink-0" />
            <h4 className="text-sm font-extrabold uppercase tracking-widest font-mono">Analisis & Panduan Kamu</h4>
          </div>

          <p className="text-stone-700 dark:text-stone-200 text-sm leading-relaxed font-normal bg-stone-50/50 dark:bg-stone-900/50 p-4 rounded-2xl border border-stone-100 dark:border-stone-850">
            {data.advice}
          </p>

          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-[10px] text-stone-400 dark:text-stone-500">
              <Info className="h-3.5 w-3.5 text-stone-300 dark:text-stone-700 shrink-0" />
              <span>Hasil bersifat edukatif, bukan diagnosis klinis resmi.</span>
            </div>
            
            <button
              onClick={handleReset}
              className="text-xs text-stone-500 hover:text-emerald-800 dark:text-stone-400 dark:hover:text-emerald-400 font-bold transition flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Jawab Ulang</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
