"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SchoolLogo } from "@/components/school-logo";
import { InstagramIcon } from "@/components/icons";
import { ViewSwitch } from "@/components/view-switch";
import { SPMB, SCHOOL } from "@/lib/school";

const MENU_LINKS = [
  { href: "/profil", label: "Profil Sekolah" },
  { href: "/berita", label: "Berita & Pengumuman" },
  { href: "/instagram", label: "Galeri Instagram" },
  { href: "/spmb", label: "SPMB" },
  { href: "/kontak", label: "Kontak" },
];

/** Header ringkas mobile: logo + tombol menu. */
export function MobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup panel tiap pindah halaman.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/95 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <SchoolLogo className="h-9 w-9" priority />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-sm font-bold text-primary-800">
              {SCHOOL.shortName}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wide text-accent-600">
              Jetis, Yogyakarta
            </span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile-panel"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800 transition active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="menu-mobile-panel"
          className="animate-fade-in border-t border-primary-100 bg-white px-4 pb-4 pt-3"
        >
          {SPMB.isOpen && (
            <Link
              href="/spmb"
              className="mb-3 flex items-center justify-between rounded-2xl bg-primary-800 px-4 py-3 text-sm font-semibold text-white"
            >
              <span>
                SPMB dibuka
                <span className="mt-0.5 block text-xs font-normal text-primary-200">
                  {SPMB.period}
                </span>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}

          <ul className="grid grid-cols-2 gap-2">
            {MENU_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-primary-100 bg-mist px-3 py-3 text-sm font-semibold text-primary-800 transition active:bg-primary-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center gap-2 border-t border-primary-100 pt-3">
            <a
              href={SCHOOL.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-earth-50 px-3 py-2.5 text-sm font-semibold text-primary-700"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
            <ViewSwitch
              target="desktop"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary-200 px-3 py-2.5 text-sm font-semibold text-primary-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M8 20h8M12 16v4" />
              </svg>
              Versi desktop
            </ViewSwitch>
          </div>
        </div>
      )}
    </header>
  );
}
