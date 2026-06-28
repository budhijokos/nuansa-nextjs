export interface ComplaintStep {
  title: string;
  desc: string;
}

export interface ComplaintGuideline {
  id: string;
  title: string;
  badge: string;
  icon: string;
  description: string;
  symptoms: string[];
  steps: ComplaintStep[];
  service: string;
  serviceLabel: string;
  bookingTemplate: string;
}

export const COMPLAINT_GUIDELINES: ComplaintGuideline[] = [
  {
    id: "anxiety",
    title: "Kecemasan Berlebih (Anxiety & Panic)",
    badge: "DSM-5 Psikoedukasi Terakreditasi",
    icon: "Brain",
    description: "Rasa cemas intens yang mengganggu fungsi harian, sering disertai gejala somatis (dada sesak, jantung berdebar keras, ketegangan otot) serta kekhawatiran persisten mengenai masa depan.",
    symptoms: [
      "Pikiran khawatir berlebih yang sulit dikendalikan secara sadar",
      "Gejala fisik berupa ketegangan otot bahu/leher, dahi kaku, tangan basah dingin",
      "Kesulitan tidur nyenyak akibat pikiran berputar kencang di malam hari"
    ],
    steps: [
      { title: "Metode Grounding Indera 5-4-3-2-1", desc: "Sebutkan 5 objek visual di sekitarmu, sentuh & rasakan 4 tekstur benda fisik, dengarkan 3 macam bebunyian berbeda, hirup/ingat 2 aroma terdekat, dan rasakan 1 cita rasa/emosi dominan batin saat ini demi memutus rantai kepanikan batin." },
      { title: "Pernapasan Diafragma Perlahan (Box Breathing)", desc: "Tarik napas perlahan melalui rongga hidung selama 4 detik, tahan napas dengan rileks selama 4 detik, lalu embuskan memanjang perlahan mengosongkan perut lewat mulut dalam 4 detik." }
    ],
    service: "Konseling Offline (Tatap Muka)",
    serviceLabel: "Konseling Individu & Terapi CBT (Cognitive Behavioral Therapy)",
    bookingTemplate: "Halo admin Nuansa. Saya membaca panduan keluhan standar psikologi di website Nuansa mengenai Kecemasan Berlebih (Anxiety). Saya tertarik mendaftar sesi konseling tatap muka di Cimone Barat demi penanganan profesional yang intensif bersama Psikolog."
  },
  {
    id: "burnout",
    title: "Stres Kerja & Kejenuhan Kronis (Burnout)",
    badge: "Standar Kesehatan Mental Kerja (WHO)",
    icon: "Activity",
    description: "Kelelahan psikologis dan fisik yang mereduksi efektivitas kerja, dipicu oleh tuntutan beban profesional berlebih tanpa sirkulasi jeda istirahat kognitif yang memadai.",
    symptoms: [
      "Rasa lelah kronis (exhaustion) yang tidak berkurang meskipun telah tidur lama",
      "Sikap sinis, apatis, atau menjauh secara mental dari tanggung jawab profesi",
      "Menurunnya performa pencapaian kerja disertai rasa bersalah serta tidak berdaya"
    ],
    steps: [
      { title: "Pemberlakuan Batas Tegas (Switch-off Zone)", desc: "Atur alarm/jadwal khusus untuk mengecek surel atau percakapan kerja di malam hari. Berikan otak hak batin penuh untuk sepenuhnya lepas dari tuntutan tugas." },
      { title: "Metode Pomodoro & Peregangan Mikro", desc: "Atur waktu 25 menit fokus bekerja penuh, diikuti istirahat fisik 5 menit untuk sekadar berjalan, meregangkan bahu kaku, atau minum air agar sirkulasi oksigen kembali segar." }
    ],
    service: "Konseling Online (WA/Video Call)",
    serviceLabel: "Konseling Karir, Manajemen Stres & Employee Assistance Program",
    bookingTemplate: "Halo admin Nuansa. Saya mengalami kelelahan batin (burnout) akibat beban stres kerja kronis. Saya ingin mendaftar sesi konseling online agar bisa mengurai stres adaptif bersama psikolog profesional Nuansa."
  },
  {
    id: "relationship",
    title: "Hambatan Relasi & Konflik Pasangan",
    badge: "Metodologi Relasi Sistemik & Gottman",
    icon: "Heart",
    description: "Masalah komunikasi dua arah, argumen yang mandek pada akar yang sama, memudarnya keintiman emosional, serta ketidakselarasan visi berkeluarga.",
    symptoms: [
      "Munculnya kebiasaan saling menyalahkan (criticism) hingga mendiamkan pasangan (stonewalling)",
      "Ketidaksepahaman pola pengasuhan balita (parenting style) yang menguras emosi harian",
      "Kehampaan ikatan intimasi batin meskipun hidup dan tinggal di bawah satu atap rumah"
    ],
    steps: [
      { title: "Bahasa Komunikasi Berpusat Pada Diri (I-Statement)", desc: "Biasakan merumuskan keluhan dari sudut pandang diri sendiri. Ubah kalimat ('Kamu selalu mengabaikan aku!') menjadi ('Aku merasa tersisih dan cemas ketika kita jarang duduk mengobrol santai bersama')." },
      { title: "Penyusunan Peta Cinta Harian (Love Maps)", desc: "Sepakati waktu 10 menit bebas gawai/handphone setiap petang khusus untuk mengobrol santai menanyakan perasaan, tantangan emosional pasangan, serta mengapresiasi kontribusi satu sama lain." }
    ],
    service: "Konseling Offline (Tatap Muka)",
    serviceLabel: "Konseling Pernikahan, Mediasi Pasangan & Terapi Keluarga",
    bookingTemplate: "Halo admin Nuansa. Saya dan pasangan sedang dalam fase hambatan komunikasi relasi yang serius. Kami bermaksud mengikuti sesi konseling pernikahan offline guna mencari solusi terbimbing bersama psikolog."
  },
  {
    id: "parenting",
    title: "Tantangan Pola Asuh & Tumbuh Kembang Anak",
    badge: "Pedagogi & Psikologi Perkembangan Terapan",
    icon: "Smile",
    description: "Keraguan menyikapi ledakan amarah anak (tantrum), ketergantungan gawai (gadget addiction), pembangkangan aturan, hingga perubahan emosional pubertas pada remaja.",
    symptoms: [
      "Kesulitan luar biasa menerapkan kedisiplinan rumah tangga tanpa kekerasan atau bentakan",
      "Anak menarik diri dari pergaulan sosial, mogok sekolah, atau prestasi belajar anjlok",
      "Sering berbeda pendapat antar orang tua / sanak keluarga mengenai tata tertib anak"
    ],
    steps: [
      { title: "Validasi Emosi Sebelum Koreksi Perilaku", desc: "Ketika anak merajuk atau rewel, hindari membentak. Duduk sejajar matanya, peluk tenang, katakan: ('Bunda tahu adik kecewa karena keinginan belum dikabulkan'). Setelah tangisnya reda, mulailah mengedukasi." },
      { title: "Alokasikan Waktu Emas Tanpa Distraksi (Mindful Play)", desc: "Luangkan 15 menit penuh sehari hanya berfokus menemani, mendengarkan celoteh, atau ikut bermain langsung bersama anak tanpa tersela notifikasi handphone atau pekerjaan." }
    ],
    service: "Tes Psikologi Bakat Minat / IQ",
    serviceLabel: "Konseling Tumbuh Kembang, Terapi Perilaku & Deteksi Potensi Minat Bakat",
    bookingTemplate: "Halo admin Nuansa. Saya ingin berdiskusi mengenai konsultasi pola asuh anak bersama psikolog / mendaftarkan anak saya untuk tes bakat minat IQ agar potensi tumbuh kembangnya terarah matang."
  },
  {
    id: "grief",
    title: "Pemulihan Trauma & Kedukaan Mendalam (Grief)",
    badge: "Dukungan Psikososial & PFA Standard",
    icon: "Shield",
    description: "Kedukaan/kesedihan mendalam yang tersisa akibat rontoknya stabilitas psikis pasca ditinggalkan orang terkasih, kerugian karir masif, atau kilas balik memori kegagalan masa lalu yang menghantui.",
    symptoms: [
      "Kehampaan gairah hidup yang berlarut-larut pasca melewati peristiwa kehilangan/pemutusan",
      "Sensitivitas tinggi terhadap pemicu kenangan duka (grief flooding) yang memicu tangis spontan",
      "Kesulitan berkomitmen kembali atau memercayai masa depan dan relasi baru karena takut kecewa"
    ],
    steps: [
      { title: "Beri Izin Diri Berduka (Self-Compassionate Mourning)", desc: "Terimalah bahwa sedih, duka, atau kecewa adalah ekspresi cinta yang kehilangan arah. Menekan tangis paksa justru melipatgandakan sumbatan mental." },
      { title: "Metode Jangkar Visual (Safe Space Anchor)", desc: "Saat dihantam kegelisahan kilas balik duka, pejamkan mata sejenak. Tarik napas diafragma, bayangkan tempat terindah, terhangat, dan tersunyi yang pernah batinmu kenal, tancapkan ketenangan di sana." }
    ],
    service: "Konseling Offline (Tatap Muka)",
    serviceLabel: "Terapi Pemulihan Trauma EMDR & Sesi Dukungan Kedukaan",
    bookingTemplate: "Halo admin Nuansa. Saya butuh pendampingan profesional untuk membantu menyembuhkan memori trauma / rasa kehilangan (grief work) yang menekan batin saya belakangan ini."
  }
];
