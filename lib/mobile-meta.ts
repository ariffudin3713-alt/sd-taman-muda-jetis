import type { Metadata } from "next";

/**
 * Metadata untuk halaman versi mobile.
 *
 * Alamatnya sama dengan versi desktop (middleware me-rewrite, bukan
 * mengalihkan), jadi canonical cukup menunjuk path yang sama. Sengaja TIDAK
 * memakai `robots: noindex`: Googlebot smartphone juga masuk ke halaman ini
 * untuk URL aslinya.
 */
export function mobilePageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
  };
}
