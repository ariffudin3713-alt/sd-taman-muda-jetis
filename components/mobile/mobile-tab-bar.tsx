import Link from "next/link";

/** Bagian situs yang bisa disorot di bilah tab bawah. */
export type MobileTab =
  | "beranda"
  | "profil"
  | "ekstrakurikuler"
  | "berita"
  | "kontak"
  | "ppdb"
  | "instagram";

const glyph = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const TABS: Array<{ key: MobileTab; href: string; label: string; icon: React.ReactNode }> = [
  {
    key: "beranda",
    href: "/",
    label: "Beranda",
    icon: (
      <svg {...glyph} className="h-6 w-6" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5" />
        <path d="M6 9.5V20h12V9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    key: "berita",
    href: "/berita",
    label: "Berita",
    icon: (
      <svg {...glyph} className="h-6 w-6" aria-hidden="true">
        <path d="M4 5h11v14H5.5A1.5 1.5 0 0 1 4 17.5V5Z" />
        <path d="M15 8h4.5V17a2 2 0 0 1-2 2H15" />
        <path d="M7 9h5M7 12h5M7 15h3" />
      </svg>
    ),
  },
  {
    key: "instagram",
    href: "/instagram",
    label: "Galeri",
    icon: (
      <svg {...glyph} className="h-6 w-6" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "ppdb",
    href: "/ppdb",
    label: "PPDB",
    icon: (
      <svg {...glyph} className="h-6 w-6" aria-hidden="true">
        <circle cx="10" cy="8" r="3.5" />
        <path d="M4 20a6 6 0 0 1 12 0" />
        <path d="M18 8v6M15 11h6" />
      </svg>
    ),
  },
  {
    key: "kontak",
    href: "/kontak",
    label: "Kontak",
    icon: (
      <svg {...glyph} className="h-6 w-6" aria-hidden="true">
        <path d="M20 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 2.3 5.6 1.8 1.8 0 0 1 4.1 3.6h2.6a1.8 1.8 0 0 1 1.8 1.6c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9L7.6 10.7a14 14 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.6 1.8Z" />
      </svg>
    ),
  },
];

/**
 * Bilah navigasi bawah khusus mobile.
 *
 * `active` dikirim eksplisit dari tiap halaman (bukan dari usePathname) supaya
 * sorotan tab tetap benar meski URL di-rewrite middleware ke /m/*.
 */
export function MobileTabBar({ active }: { active: MobileTab }) {
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(28,62,44,0.4)] backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <li key={tab.key} className="flex-1">
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition ${
                  isActive ? "text-primary-800" : "text-ink-soft"
                }`}
              >
                <span
                  className={`flex h-8 w-14 items-center justify-center rounded-full transition ${
                    isActive ? "bg-primary-100 text-primary-800" : "text-ink-soft"
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
