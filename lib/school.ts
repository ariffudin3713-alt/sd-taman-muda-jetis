/**
 * ==================================================================
 *  ISI FILE INI ADALAH TEKS CONTOH — GANTI DENGAN DATA ASLI SEKOLAH
 * ==================================================================
 *
 * Semua konten statis situs (profil, visi & misi, sejarah, fasilitas,
 * SPMB, kontak) dikumpulkan di satu file supaya mudah diperbarui
 * tanpa menyentuh komponen.
 *
 * Ingin mengganti isi? Cukup edit nilai di bawah — tidak ada kode
 * komponen yang perlu diubah.
 */

/**
 * URL dasar situs. Dipakai untuk canonical, sitemap, dan data terstruktur
 * (schema.org) yang memerlukan URL absolut.
 * Ganti dengan domain asli saat situs dipublikasikan.
 */
export const SITE_URL = "https://sdtamanmudajetis.sch.id";

export const SCHOOL = {
  name: "SD Tamansiswa Jetis Yogyakarta",
  shortName: "SD Tamansiswa Jetis",
  tagline: "Bertumbuh, Berprestasi, dan Berbudaya.",
  addressLines: [
    "Jl. Ki Hajar Dewantara No. 12",
    "Jetis, Kota Yogyakarta",
    "Daerah Istimewa Yogyakarta 55233",
  ],
  phone: "(0274) 545517",
  phoneHref: "tel:+62274545517",
  email: "tamanmudajetis@gmail.com",
  instagram: "@sdtamanmudajetis",
  instagramUrl: "https://www.instagram.com/sdtamanmudajetis/",
  npsn: "20404159",
} as const;

/** Jam layanan sekolah, ditampilkan di halaman kontak. */
export const SCHOOL_HOURS = [
  { day: "Senin – Jumat", time: "07.00 – 14.00 WIB" },
  { day: "Sabtu", time: "07.00 – 12.00 WIB" },
  { day: "Minggu & hari libur", time: "Tutup" },
] as const;

const MAPS_QUERY = encodeURIComponent("SD Taman Muda Jetis Yogyakarta, Jetis, Yogyakarta");

/** Tautan Google Maps. Format `output=embed` bisa dipakai di <iframe> tanpa API key. */
export const SCHOOL_MAPS = {
  embed: `https://maps.google.com/maps?q=${MAPS_QUERY}&hl=id&z=15&output=embed`,
  link: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
} as const;

/* ------------------------------------------------------------------ *
 * Kepala sekolah
 * ------------------------------------------------------------------ */

/** Setiap entri = satu paragraf, dirender terpisah di beranda. */
export const HEAD_MASTER = {
  name: "Budi Santoso, S.Pd.",
  role: "Kepala Sekolah",
  photo: "/kepala-sekolah.jpg",
  paragraphs: [
    "Assalamu’alaikum dan selamat datang di website resmi SD Taman Muda Jetis Yogyakarta.",
    "Kami menyediakan lingkungan belajar yang aman dan menyenangkan.",
    "Setiap hari kami melatih kemandirian, karakter, dan kreativitas.",
    "Semoga website ini menjadi pintu informasi bagi warga sekolah.",
    "Terima kasih atas kunjungan dan kerja samanya.",
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Profil sekolah
 * ------------------------------------------------------------------ */

export const VISION =
  "Terwujudnya lulusan yang berakhlak mulia, unggul dalam prestasi akademik maupun non-akademik, serta berwawasan lingkungan.";

export const MISSIONS = [
  "Menyelenggarakan pembelajaran yang inovatif, kreatif, dan menyenangkan.",
  "Menanamkan nilai-nilai keagamaan dan budi pekerti luhur dalam keseharian.",
  "Mengembangkan minat dan bakat siswa melalui berbagai kegiatan sekolah.",
  "Meningkatkan penguasaan teknologi informasi dan komunikasi.",
  "Membangun lingkungan sekolah yang bersih, hijau, dan ramah anak.",
] as const;

export const HISTORY =
  "Perguruan Tamansiswa didirikan oleh Ki Hadjar Dewantara pada tanggal 3 Juli 1922 di Yogyakarta dengan nama National Onderwijs Instituut Taman Siswa. Taman Muda merupakan jenjang Sekolah Dasar dalam sistem pendidikan Tamansiswa yang menerapkan konsep pendidikan 'among' dengan tiga asas yaitu Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, dan Tut Wuri Handayani. SD Taman Muda Jetis Yogyakarta merupakan bagian dari jaringan Perguruan Tamansiswa yang terus melestarikan dan mengembangkan pendidikan nasional berbasis budaya bangsa dengan menumbuhkan peserta didik yang berakhlak mulia, mandiri, dan bertanggung jawab sesuai dengan filosofi pendidikan Ki Hadjar Dewantara.";

/** `icon` menentukan ilustrasi SVG di kartu fasilitas (lihat components/icons.tsx). */
export const FACILITIES = [
  { icon: "computer", name: "Laboratorium Komputer", description: "Perangkat modern dan akses internet cepat." },
  { icon: "book", name: "Perpustakaan Digital", description: "Koleksi buku cetak dan e-book yang lengkap." },
  { icon: "flask", name: "Laboratorium IPA", description: "Fasilitas praktikum IPA dasar." },
  { icon: "ball", name: "Lapangan Olahraga", description: "Lapangan basket, futsal, dan voli." },
  { icon: "music", name: "Ruang Seni & Musik", description: "Wadah mengasah kreativitas siswa." },
  { icon: "mosque", name: "Musholla & Kantin Sehat", description: "Sarana ibadah dan konsumsi bergizi." },
] as const;

export type FacilityIcon = (typeof FACILITIES)[number]["icon"];

/* ------------------------------------------------------------------ *
 * SPMB (Seleksi Penerimaan Murid Baru)
 * ------------------------------------------------------------------ */

export const SPMB = {
  isOpen: true,
  period: "Gelombang I Tahun Ajaran 2026/2027",
  quota: 120,
  contactNote: "Pendaftaran dilakukan langsung di sekolah pada jam kerja.",
} as const;

export const SPMB_STEPS = [
  { step: "1", title: "Pengambilan Formulir", description: "Datang ke sekolah pada jam kerja dan isi formulir pendaftaran." },
  { step: "2", title: "Penyerahan Berkas", description: "Serahkan dokumen pendukung bersama wali murid." },
  { step: "3", title: "Wawancara Orang Tua", description: "Wawancara singkat dengan kepala sekolah dan wali kelas." },
  { step: "4", title: "Pengumuman", description: "Hasil seleksi diumumkan dan pendaftaran dilunasi." },
] as const;

export const SPMB_REQUIREMENTS = [
  "Fotokopi akta kelahiran calon siswa",
  "Fotokopi kartu keluarga",
  "Fotokopi rapor semester terakhir",
  "Pas foto terbaru calon siswa",
  "Buku KIA dan bukti imunisasi",
  "Bukti pembayaran uang pangkal",
] as const;

export const SPMB_SCHEDULE = [
  { stage: "Pendaftaran", date: "1 – 20 Juni 2026" },
  { stage: "Seleksi & Wawancara", date: "21 – 25 Juni 2026" },
  { stage: "Pengumuman", date: "27 Juni 2026" },
  { stage: "Registrasi ulang", date: "28 Juni – 5 Juli 2026" },
] as const;

/* ------------------------------------------------------------------ *
 * Statistik beranda
 * ------------------------------------------------------------------ */

export const HOME_STATS = [
  { value: "B", label: "Akreditasi" },
  { value: "65+", label: "Siswa aktif" },
  { value: "13+", label: "Guru dan staf" },
] as const;
