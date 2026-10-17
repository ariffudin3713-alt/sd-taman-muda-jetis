/**
 * Pilihan tampilan (desktop atau mobile).
 *
 * Situs menyajikan dua kerangka berbeda untuk alamat yang sama:
 *   - pengunjung desktop  -> kerangka app/(site)
 *   - pengunjung seluler  -> kerangka app/m (MobileShell)
 *
 * `middleware.ts` menebak dari User-Agent, lalu pengunjung bisa menimpanya
 * lewat tombol "Versi desktop" / "Versi mobile" yang menyimpan cookie di bawah.
 */

export type ViewMode = "mobile" | "desktop";

/** Nama cookie yang dibaca middleware. */
export const VIEW_COOKIE = "tampilan";

/** Cookie berlaku satu tahun. */
export const VIEW_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Simpan pilihan pengunjung. Hanya berjalan di browser. */
export function setViewCookie(mode: ViewMode) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${VIEW_COOKIE}=${mode}; path=/; max-age=${VIEW_COOKIE_MAX_AGE}; samesite=lax${secure}`;
}
