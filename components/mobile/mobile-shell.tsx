import { MobileHeader } from "./mobile-header";
import { MobileTabBar, type MobileTab } from "./mobile-tab-bar";

/**
 * Kerangka tampilan MOBILE.
 *
 * Dipasang manual oleh tiap halaman di app/m supaya tab aktif bisa dikirim
 * lewat prop `active` (URL di-rewrite middleware, jadi usePathname kurang
 * cocok untuk menentukan sorotan tab).
 */
export function MobileShell({
  active,
  children,
}: {
  active: MobileTab;
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <MobileHeader />
      <div id="konten" className="flex-1 pb-24">
        {children}
      </div>
      <MobileTabBar active={active} />
    </>
  );
}
