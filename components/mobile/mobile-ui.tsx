import Link from "next/link";
import type { BeritaItem } from "@/lib/berita";
import { ArrowRightIcon, ClockIcon } from "@/components/icons";

/**
 * Kumpulan blok tampilan kecil yang dipakai berulang di halaman-halaman mobile
 * (app/m/*). Semuanya Server Component agar halaman tetap ringan.
 */

/** Pita judul ringkas untuk halaman dalam versi mobile. */
export function MobileHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-900 px-4 pb-7 pt-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-700/50 blur-3xl"
      />
      <div className="relative">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-300">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight text-white text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-primary-200">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Judul bagian, rata kiri, dengan aksi opsional di kanan. */
export function MobileSectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-primary-900">
          {title}
        </h2>
      </div>
      {action && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  );
}

/** Tautan "Lihat semua" bergaya teks yang dipakai bersama MobileSectionHeading. */
export function MobileSeeAll({ href, label = "Lihat semua" }: { href: string; label?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
      {label}
      <ArrowRightIcon className="h-3.5 w-3.5" />
    </Link>
  );
}

/** Baris berita ringkas: gambar kiri, teks kanan. Seluruh kartu bisa diklik. */
export function MobileBeritaRow({ item }: { item: BeritaItem }) {
  return (
    <article className="relative flex items-center gap-3 rounded-2xl border border-primary-100 bg-white p-3 transition active:scale-[0.99] active:bg-primary-50">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-earth-100">
        {item.mediaUrl ? (
          <img
            src={item.mediaUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[10px] text-ink-soft">
            Tanpa gambar
          </span>
        )}
        {item.isVideo && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-950/60 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${item.categoryTone}`}
        >
          {item.category}
        </span>
        <h3 className="mt-1.5 line-clamp-2 font-display text-sm font-bold leading-snug text-primary-900">
          <Link href={`/berita/${item.slug}`} className="transition active:text-primary-700">
            <span className="absolute inset-0" aria-hidden="true" />
            {item.title}
          </Link>
        </h3>
        {item.dateLabel && (
          <time
            dateTime={item.dateIso}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-ink-soft"
          >
            <ClockIcon className="h-3 w-3" />
            {item.dateLabel}
          </time>
        )}
      </div>
    </article>
  );
}

/** Kartu informasi sederhana dengan ikon opsional. */
export function MobileCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-primary-100 bg-white p-4 ${className}`}>
      {children}
    </div>
  );
}
