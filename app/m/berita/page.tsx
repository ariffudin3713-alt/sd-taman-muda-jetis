import type { Metadata } from "next";
import Link from "next/link";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileBeritaRow, MobileHero } from "@/components/mobile/mobile-ui";
import { buildBeritaCategories, getBerita } from "@/lib/berita";
import { mobilePageMetadata } from "@/lib/mobile-meta";

/** Data di-refresh tiap jam agar URL media CDN tetap berlaku. */
export const revalidate = 3600;

export const metadata: Metadata = mobilePageMetadata({
  title: "Berita",
  description:
    "Kabar terbaru, pengumuman, dan prestasi SD Taman Muda Jetis Yogyakarta.",
  path: "/berita",
});

export default async function MobileBeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const { items, error } = await getBerita();

  const categories = buildBeritaCategories(items);
  const active = categories.some((category) => category.name === kategori) ? kategori : undefined;
  const filtered = active ? items.filter((item) => item.category === active) : items;

  return (
    <MobileShell active="berita">
      <MobileHero
        eyebrow="Kabar sekolah"
        title="Berita &amp; Pengumuman"
        description="Kabar terbaru dan pengumuman resmi dari sekolah."
      />

      {/* ---------------- Filter kategori ---------------- */}
      {!error && categories.length > 1 && (
        <div className="sticky top-[3.5rem] z-30 border-b border-primary-100 bg-white/95 backdrop-blur-md">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
            <Link
              href="/berita"
              aria-current={active ? undefined : "page"}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                active ? "bg-mist text-ink-soft" : "bg-primary-700 text-white"
              }`}
            >
              Semua
            </Link>
            {categories.map((category) => {
              const isActive = category.name === active;
              return (
                <Link
                  key={category.name}
                  href={`/berita?kategori=${encodeURIComponent(category.name)}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    isActive ? "bg-primary-700 text-white" : "bg-mist text-ink-soft"
                  }`}
                >
                  {category.name}
                  <span className="ml-1.5 opacity-70">{category.count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-4 py-5">
        {error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-800">Berita belum bisa dimuat.</p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
            <Link href="/berita" className="btn-primary mt-4">
              Muat ulang
            </Link>
          </div>
        )}

        {filtered.length > 0 ? (
          <>
            <div className="space-y-3">
              {filtered.map((item) => (
                <MobileBeritaRow key={item.id} item={item} />
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-ink-soft" role="status">
              Menampilkan {filtered.length} dari {items.length} berita
              {active ? ` dalam kategori ${active}` : ""}.
            </p>
          </>
        ) : (
          !error && (
            <div className="rounded-3xl border border-dashed border-primary-200 bg-white px-6 py-14 text-center">
              <p className="font-display text-base font-bold text-primary-900">Belum ada berita</p>
              <p className="mt-2 text-sm text-ink-soft">
                {active
                  ? `Tidak ada berita dalam kategori ${active}.`
                  : "Belum ada berita yang dipublikasikan."}
              </p>
              {active && (
                <Link href="/berita" className="btn-primary mt-5">
                  Lihat semua berita
                </Link>
              )}
            </div>
          )
        )}
      </div>
    </MobileShell>
  );
}
