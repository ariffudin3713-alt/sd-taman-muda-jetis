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
  name: "SD Taman Muda Jetis Yogyakarta",
  shortName: "SD Taman Muda",
  tagline: "Bertumbuh, Berprestasi, dan Berbudaya.",
  addressLines: [
    "Jl. Ki Hajar Dewantara No. 12",
    "Jetis, Kota Yogyakarta",
    "Daerah Istimewa Yogyakarta 55233",
  ],
  phone: "(0231) 206279",
  phoneHref: "tel:+62231206279",
  email: "sdtamanmuda23@gmail.com",
  instagram: "@sdtamanmudajetis",
  instagramUrl: "https://www.instagram.com/sdtamanmudajetis/",
  npsn: "20405123",
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
  "Didirikan pada tahun 1995, SD Taman Muda Jetis Yogyakarta terus berkembang menjadi salah satu lembaga pendidikan yang dipercaya di Yogyakarta. Dengan komitmen tinggi terhadap kualitas pengajaran dan pembentukan karakter, sekolah ini telah meluluskan ribuan alumni yang melanjutkan pendidikan ke jenjang yang lebih tinggi.";

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
  { value: "A", label: "Akreditasi" },
  { value: "420+", label: "Siswa aktif" },
  { value: "38+", label: "Guru dan staf" },
] as const;
