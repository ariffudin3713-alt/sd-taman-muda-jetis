"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Caption } from "@/components/caption";
import { SafeImage } from "@/components/safe-image";
import {
  MEDIA_FILTERS,
  matchesFilter,
  matchesQuery,
  type FilterId,
  type PostView,
} from "@/lib/present";

const INITIAL_VISIBLE = 12;

/**
 * Galeri versi mobile: kisi dua kolom dan penampil layar penuh.
 * Berbeda dari galeri desktop (kisi 3 kolom + lightbox dua panel).
 */
export function MobileGallery({
  views,
  categories,
}: {
  views: PostView[];
  categories: Array<{ name: string; count: number }>;
}) {
  const [mediaFilter, setMediaFilter] = useState<FilterId>("all");
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      views.filter(
        (view) =>
          matchesFilter(view, mediaFilter) &&
          (category === null || view.category === category) &&
          matchesQuery(view, query)
      ),
    [mediaFilter, category, query, views]
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hidden = filtered.length - visible.length;
  const hasActiveFilter = mediaFilter !== "all" || category !== null || query.trim() !== "";

  return (
    <div>
      {/* ---------- Kontrol (menempel di bawah header) ---------- */}
      <div className="sticky top-[3.5rem] z-30 border-b border-primary-100 bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="relative">
          <label htmlFor="galeri-mobile-cari" className="sr-only">
            Cari unggahan
          </label>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            id="galeri-mobile-cari"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
            placeholder="Cari kegiatan atau juara..."
            className="w-full rounded-full border border-primary-100 bg-mist py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-ink-soft/60 focus:border-primary-300 focus:bg-white"
          />
        </div>

        <div
          className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4"
          role="group"
          aria-label="Saring jenis media"
        >
          {MEDIA_FILTERS.map((item) => {
            const active = mediaFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMediaFilter(item.id);
                  setShowAll(false);
                }}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  active ? "bg-primary-700 text-white" : "bg-mist text-ink-soft"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {categories.length > 1 && (
            <>
              <span aria-hidden="true" className="mx-1 w-px shrink-0 self-stretch bg-primary-100" />
              <button
                type="button"
                onClick={() => {
                  setCategory(null);
                  setShowAll(false);
                }}
                aria-pressed={category === null}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  category === null ? "bg-accent-400 text-primary-950" : "bg-earth-50 text-ink-soft"
                }`}
              >
                Semua kategori
              </button>
              {categories.map((item) => {
                const active = category === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setCategory(active ? null : item.name);
                      setShowAll(false);
                    }}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      active ? "bg-accent-400 text-primary-950" : "bg-earth-50 text-ink-soft"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* ---------- Kisi dua kolom ---------- */}
      <div className="px-4 py-5">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-primary-200 bg-white px-6 py-14 text-center">
            <p className="font-display text-base font-bold text-primary-900">
              Tidak ada unggahan yang cocok
            </p>
            <p className="mt-2 text-sm text-ink-soft">Coba kata kunci lain.</p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => {
                  setMediaFilter("all");
                  setCategory(null);
                  setQuery("");
                }}
                className="btn-primary mt-5"
              >
                Atur ulang filter
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="sr-only" role="status">
              Menampilkan {filtered.length} dari {views.length} unggahan
            </p>

            <div className="grid grid-cols-2 gap-3">
              {visible.map((view, index) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`Buka detail: ${view.title}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary-100 bg-primary-50 text-left"
                >
                  <img
                    src={view.mediaUrl}
                    alt=""
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent" />

                  <span
                    className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${view.categoryTone}`}
                  >
                    {view.category}
                  </span>

                  {view.isVideo && (
                    <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3" aria-hidden="true">
                        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                      </svg>
                    </span>
                  )}

                  <span className="absolute inset-x-0 bottom-0 p-2">
                    <span className="line-clamp-2 block font-display text-[11px] font-bold leading-snug text-white">
                      {view.title}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {hidden > 0 && (
              <div className="mt-6 text-center">
                <button type="button" onClick={() => setShowAll(true)} className="btn-ghost">
                  Tampilkan {hidden} unggahan lainnya
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {openIndex !== null && filtered[openIndex] && (
        <MobileViewer
          views={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndex={(next) => setOpenIndex((next + filtered.length) % filtered.length)}
        />
      )}
    </div>
  );
}

/** Penampil layar penuh dengan geser tombol sebelumnya/berikutnya. */
function MobileViewer({
  views,
  index,
  onClose,
  onIndex,
}: {
  views: PostView[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const view = views[index];

  const go = useCallback(
    (delta: number) => onIndex(index + delta),
    [index, onIndex]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [go, onClose]);

  if (!view) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detail: ${view.title}`}
      className="fixed inset-0 z-[60] flex animate-fade-in flex-col bg-primary-950/97 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
        <span className="text-xs font-medium text-primary-300">
          {index + 1} / {views.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/40">
        {view.isVideo && view.videoUrl ? (
          <video
            key={view.id}
            src={view.videoUrl}
            poster={view.mediaUrl}
            controls
            playsInline
            className="max-h-full w-full object-contain"
          />
        ) : (
          <SafeImage
            key={view.id}
            src={view.mediaUrl}
            alt={view.title}
            className="max-h-full w-full object-contain"
          />
        )}

        {views.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Postingan sebelumnya"
              className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M15 18 9 12l6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Postingan berikutnya"
              className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="max-h-[45vh] shrink-0 overflow-y-auto rounded-t-3xl bg-white px-4 pb-8 pt-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${view.categoryTone}`}>
            {view.category}
          </span>
          {view.dateLabel && (
            <time dateTime={view.dateIso} className="text-[11px] text-ink-soft">
              {view.datePrefix ? `${view.datePrefix} ` : ""}
              {view.dateLabel}
            </time>
          )}
          {view.hasEngagement && (
            <span className="text-[11px] text-ink-soft">
              &#9825; {view.likesLabel} &middot; &#128172; {view.commentsLabel}
            </span>
          )}
        </div>

        <h2 className="font-display text-lg font-bold leading-snug text-primary-900">
          {view.title}
        </h2>

        <Caption
          lines={view.captionLines}
          className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft"
        />

        {view.hashtags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {view.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {view.permalink && (
          <a
            href={view.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full"
          >
            Lihat di Instagram
          </a>
        )}
      </div>
    </div>
  );
}
