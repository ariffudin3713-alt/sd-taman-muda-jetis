import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * Kerangka tampilan DESKTOP.
 *
 * Semua halaman "versi layar besar" tinggal di dalam grup rute `(site)`
 * (lihat app/(site)/page.tsx untuk beranda). Versi mobile punya kerangka
 * sendiri di MobileShell dan diakses lewat rute /m/*.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <SiteHeader />
      <div id="konten" className="flex-1">
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
