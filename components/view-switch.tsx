"use client";

import { setViewCookie, type ViewMode } from "@/lib/view";

/**
 * Tombol untuk memaksa tampilan desktop atau mobile.
 *
 * Menyimpan pilihan di cookie lalu memuat ulang halaman; middleware membaca
 * cookie itu dan menyajikan kerangka yang sesuai.
 */
export function ViewSwitch({
  target,
  className = "",
  children,
}: {
  target: ViewMode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        setViewCookie(target);
        window.location.reload();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
