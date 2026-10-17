import { NextResponse, type NextRequest } from "next/server";
import { VIEW_COOKIE } from "@/lib/view";

/**
 * Kirim pengunjung seluler ke versi mobile tanpa mengubah alamat di address bar.
 *
 * Cara kerja:
 *  - Permintaan dari perangkat seluler di-`rewrite` ke `/m<path>` (rute khusus
 *    di app/m). URL yang terlihat pengunjung tetap sama, mis. `/berita`.
 *  - Halaman desktop tetap dilayani apa adanya dari app/(site).
 *  - Pengunjung dapat memaksa salah satu versi lewat cookie `tampilan`
 *    (tombol "Versi desktop"/"Versi mobile").
 *
 * Googlebot smartphone juga terdeteksi seluler, jadi versi mobile-lah yang
 * diindeks - sesuai praktik mobile-first indexing. Karena itu halaman /m/*
 * TIDAK memakai meta `noindex` (itu akan men-deindex URL aslinya); cukup
 * diblokir lewat robots.txt agar URL /m tidak muncul sebagai duplikat.
 */

/** Deteksi perangkat seluler dari User-Agent. Tablet layar besar dibiarkan desktop. */
const MOBILE_UA =
  /android.*mobile|iphone|ipod|ipad|windows phone|opera mini|iemobile|blackberry|bb10|webos|palm|symbian os|mobile safari/i;

/** Rute yang punya versi mobile khusus. */
const MOBILE_ROUTES: RegExp[] = [
  /^\/$/,
  /^\/profil\/?$/,
  /^\/ekstrakurikuler\/?$/,
  /^\/berita\/?$/,
  /^\/berita\/[^/]+\/?$/,
  /^\/kontak\/?$/,
  /^\/ppdb\/?$/,
  /^\/instagram\/?$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rute /m/* sudah versi mobile - jangan ditulis ulang agar tidak berputar.
  if (pathname === "/m" || pathname.startsWith("/m/")) {
    return NextResponse.next();
  }

  // Hanya rute yang memang punya padanan mobile.
  if (!MOBILE_ROUTES.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  const preferred = request.cookies.get(VIEW_COOKIE)?.value;
  const userAgent = request.headers.get("user-agent") ?? "";
  // Cookie menang atas deteksi otomatis.
  const wantsMobile = preferred ? preferred === "mobile" : MOBILE_UA.test(userAgent);

  if (!wantsMobile) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/m" : `/m${pathname.replace(/\/+$/, "")}`;

  // Header `Vary` untuk CDN diatur lewat next.config.mjs (Next.js menimpa
  // header Vary yang diset dari middleware).
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Jalankan pada semua halaman, kecuali aset internal Next.js, route API,
   * dan berkas statis (yang punya ekstensi).
   */
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
