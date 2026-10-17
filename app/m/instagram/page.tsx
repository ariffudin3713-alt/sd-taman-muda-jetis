import type { Metadata } from "next";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileGallery } from "./mobile-gallery";
import { INSTAGRAM_HANDLE, getInstagramPosts } from "@/lib/instagram";
import { buildCategories, computeStats, toPostView, type PostView } from "@/lib/present";
import { formatCount } from "@/lib/format";
import { mobilePageMetadata } from "@/lib/mobile-meta";

/** Data di-refresh tiap jam agar URL media CDN tetap berlaku. */
export const revalidate = 3600;

export const metadata: Metadata = mobilePageMetadata({
  title: "Galeri Instagram",
  description:
    "Foto, video, dan berita kegiatan SD Taman Muda Jetis Yogyakarta dari Instagram sekolah.",
  path: "/instagram",
});

export default async function MobileInstagramPage() {
  const { posts, error, skipped } = await getInstagramPosts();
  const views: PostView[] = posts.map((post) => toPostView(post));
  const stats = computeStats(views);
  const categories = buildCategories(views);

  const statItems = [
    { value: formatCount(stats.total), label: "Unggahan" },
    { value: formatCount(stats.photos), label: "Foto" },
    { value: formatCount(stats.videos), label: "Video" },
    { value: formatCount(stats.likes), label: "Suka" },
  ];

  return (
    <MobileShell active="instagram">
      {/* ---------------- Kepala galeri ---------------- */}
      <section className="relative isolate overflow-hidden bg-primary-900 px-4 pb-6 pt-6">
        {views[0] && (
          <div className="absolute inset-0 -z-10">
            <img
              src={views[0].mediaUrl}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900/95 to-primary-800" />
          </div>
        )}

        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-300 ring-1 ring-white/15">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          {INSTAGRAM_HANDLE}
        </span>

        <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-white text-balance">
          Galeri Instagram
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-primary-200">
          Aktivitas belajar, lomba, dan prestasi siswa - diperbarui otomatis tiap jam.
        </p>

        {views.length > 0 && (
          <dl className="mt-5 grid grid-cols-4 gap-2">
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-1.5 py-2.5 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-base font-extrabold text-accent-300">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-primary-300">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* ---------------- Galeri ---------------- */}
      {error ? (
        <div className="px-4 py-10">
          <div role="alert" className="rounded-3xl border border-red-100 bg-red-50 px-5 py-10 text-center">
            <p className="font-display text-base font-bold text-red-700">
              Galeri tidak dapat dimuat saat ini.
            </p>
            <p className="mt-2 text-sm text-red-500">Detail: {error}</p>
          </div>
        </div>
      ) : views.length === 0 ? (
        <div className="px-4 py-10">
          <div className="rounded-3xl border border-dashed border-primary-200 bg-white px-5 py-12 text-center">
            <p className="font-display text-base font-bold text-primary-900">Belum ada postingan</p>
            <p className="mt-2 text-sm text-ink-soft">
              Unggahan terbaru akan tampil di sini secara otomatis.
            </p>
          </div>
        </div>
      ) : (
        <>
          <MobileGallery views={views} categories={categories} />
          {skipped > 0 && (
            <p className="px-4 pb-6 text-center text-[11px] text-ink-soft">
              {skipped} entri tidak valid dilewati.
            </p>
          )}
        </>
      )}
    </MobileShell>
  );
}
