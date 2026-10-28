import type { Metadata } from "next";
import Link from "next/link";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileBeritaRow, MobileSectionHeading, MobileSeeAll } from "@/components/mobile/mobile-ui";
import { getInstagramPosts } from "@/lib/instagram";
import { getBerita } from "@/lib/berita";
import { buildCategories, computeStats, toPostView, type PostView } from "@/lib/present";
import { formatCount } from "@/lib/format";
import { mobilePageMetadata } from "@/lib/mobile-meta";
import { HEAD_MASTER, HOME_STATS, SPMB, SCHOOL } from "@/lib/school";

/** Data di-refresh tiap jam agar URL media CDN tetap berlaku. */
export const revalidate = 3600;

export const metadata: Metadata = mobilePageMetadata({
  title: "Beranda",
  description:
    "Kegiatan, prestasi, dan kabar terbaru SD Taman Muda Jetis Yogyakarta dalam tampilan mobile.",
  path: "/",
});

const STAT_KEYS = [
  { key: "total", label: "Unggahan" },
  { key: "photos", label: "Foto" },
  { key: "videos", label: "Video" },
  { key: "likes", label: "Suka" },
] as const;

const QUICK_ACTIONS = [
  {
    href: "/spmb",
    label: "Daftar SPMB",
    className: "bg-accent-400 text-primary-950",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <circle cx="10" cy="8" r="3.4" />
        <path d="M4 20a6 6 0 0 1 12 0M18 8v6M15 11h6" />
      </svg>
    ),
  },
  {
    href: "/profil",
    label: "Profil",
    className: "bg-white text-primary-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M6 20V6a2 2 0 0 1 2-2h10v16H8a2 2 0 0 0-2 2Z" />
        <path d="M9 8h6M9 12h6" />
      </svg>
    ),
  },
  {
    href: "/instagram",
    label: "Galeri",
    className: "bg-white text-primary-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
      </svg>
    ),
  },
  {
    href: "/kontak",
    label: "Kontak",
    className: "bg-white text-primary-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M20 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 2.3 5.6 1.8 1.8 0 0 1 4.1 3.6h2.6a1.8 1.8 0 0 1 1.8 1.6c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9L7.6 10.7a14 14 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.6 1.8Z" />
      </svg>
    ),
  },
];

export default async function MobileHomePage() {
  const { posts, error } = await getInstagramPosts();
  const views: PostView[] = posts.map((post) => toPostView(post));
  const { items: berita } = await getBerita();

  const terbaru = berita.slice(0, 3);
  const prestasi = berita.filter((item) => item.category.startsWith("Prestasi")).slice(0, 4);
  const categories = buildCategories(views).slice(0, 6);
  const stats = computeStats(views);
  const hero = views[0];
  const strip = views.slice(0, 8);

  const statValues: Record<(typeof STAT_KEYS)[number]["key"], string> = {
    total: formatCount(stats.total),
    photos: formatCount(stats.photos),
    videos: formatCount(stats.videos),
    likes: formatCount(stats.likes),
  };

  return (
    <MobileShell active="beranda">
      {/* ---------------- Hero ringkas ---------------- */}
      <section className="relative isolate overflow-hidden bg-primary-900 px-4 pb-8 pt-8">
        {hero && (
          <div className="absolute inset-0 -z-10">
            <img src={hero.mediaUrl} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900/95 to-primary-800" />
          </div>
        )}

        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-300 ring-1 ring-white/15">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
          {SPMB.isOpen ? `SPMB ${SPMB.period.split(" ")[0]} dibuka` : "Galeri kegiatan sekolah"}
        </span>

        <h1 className="mt-3 font-display text-[26px] font-extrabold leading-tight tracking-tight text-white text-balance">
          Jejak kegiatan &amp; prestasi siswa kami
        </h1>

        <p className="mt-2.5 text-sm leading-relaxed text-primary-200">
          {SCHOOL.shortName} – {SCHOOL.tagline}
        </p>

        <div className="mt-5 flex gap-2.5">
          <Link
            href={SPMB.isOpen ? "/spmb" : "/instagram"}
            className="flex flex-1 items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-primary-900 active:scale-[0.98]"
          >
            {SPMB.isOpen ? "Daftar sekarang" : "Lihat galeri"}
          </Link>
          <Link
            href="/berita"
            className="flex flex-1 items-center justify-center rounded-full border border-white/25 px-4 py-3 text-sm font-semibold text-white active:bg-white/10"
          >
            Kabar terbaru
          </Link>
        </div>

        {views.length > 0 && (
          <dl className="mt-6 grid grid-cols-4 gap-2 border-t border-white/10 pt-4">
            {STAT_KEYS.map((stat) => (
              <div key={stat.key} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-lg font-extrabold text-accent-300">
                    {statValues[stat.key]}
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

      {/* ---------------- Aksi cepat ---------------- */}
      <section className="px-4 py-5">
        <div className="grid grid-cols-4 gap-2.5">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex flex-col items-center gap-2 rounded-2xl border border-primary-100 px-1 py-3 text-center shadow-card active:scale-[0.98] ${action.className}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5">
                {action.icon}
              </span>
              <span className="text-[11px] font-semibold leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Statistik sekolah ---------------- */}
      <section className="px-4">
        <div className="grid grid-cols-3 gap-2.5 rounded-3xl border border-primary-100 bg-white p-4 shadow-card">
          {HOME_STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-mist px-3 py-3 text-center">
              <span className="block font-display text-xl font-extrabold text-primary-800">
                {stat.value}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Kabar terbaru ---------------- */}
      {terbaru.length > 0 && (
        <section className="px-4 py-6">
          <MobileSectionHeading
            eyebrow="Kabar terbaru"
            title="Berita dan kegiatan"
            action={<MobileSeeAll href="/berita" />}
          />
          <div className="space-y-3">
            {terbaru.map((item) => (
              <MobileBeritaRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ---------------- Prestasi ---------------- */}
      {prestasi.length > 0 && (
        <section className="py-2">
          <div className="px-4">
            <MobileSectionHeading
              eyebrow="Sorotan"
              title="Prestasi siswa"
              action={<MobileSeeAll href="/berita?kategori=Prestasi" />}
            />
          </div>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3">
            {prestasi.map((item) => (
              <article
                key={item.id}
                className="relative w-40 shrink-0 snap-start overflow-hidden rounded-2xl border border-primary-100 bg-white"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-earth-100">
                  {item.mediaUrl && (
                    <img src={item.mediaUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="p-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${item.categoryTone}`}>
                    {item.category}
                  </span>
                  <h3 className="mt-1.5 line-clamp-3 font-display text-xs font-bold leading-snug text-primary-900">
                    <Link href={`/berita/${item.slug}`}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.title}
                    </Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- Kategori ---------------- */}
      {categories.length > 0 && (
        <section className="px-4 py-6">
          <MobileSectionHeading eyebrow="Telusuri" title="Jelajahi kegiatan" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/berita?kategori=${encodeURIComponent(category.name)}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary-700 active:bg-primary-50"
              >
                {category.name}
                <span className="rounded-full bg-primary-100 px-1.5 py-0.5 text-[10px] text-primary-700">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- Sorotan visual ---------------- */}
      {strip.length > 0 && (
        <section className="py-2 pb-8">
          <div className="px-4">
            <MobileSectionHeading
              eyebrow="Galeri"
              title="Sorotan visual"
              action={<MobileSeeAll href="/instagram" label="Buka" />}
            />
          </div>
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-4 pb-2">
            {strip.map((view) => (
              <Link
                key={view.id}
                href="/instagram"
                className="relative aspect-[4/5] w-32 shrink-0 overflow-hidden rounded-2xl border border-primary-100 bg-primary-50"
              >
                <img
                  src={view.mediaUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {view.isVideo && (
                  <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {error && (
        <p className="px-4 pb-6 text-xs text-ink-soft">
          Catatan: sebagian data galeri gagal dimuat ({error}).
        </p>
      )}

      {/* ---------------- CTA ---------------- */}
      <section className="mx-4 mb-6 rounded-3xl bg-gradient-to-br from-primary-800 to-primary-700 p-5 text-center">
        <h2 className="font-display text-lg font-bold text-white text-balance">
          {SPMB.isOpen ? "Ingin bergabung dengan kami?" : "Lihat kegiatan terbaru sekolah"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-primary-100">
          {SPMB.isOpen
            ? `Lihat alur, syarat, dan jadwal pendaftaran siswa baru ${SPMB.period}.`
            : "Buka galeri lengkap untuk melihat foto, video, dan pengumuman sekolah."}
        </p>
        <Link
          href={SPMB.isOpen ? "/spmb" : "/instagram"}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent-400 px-4 py-3 text-sm font-semibold text-primary-950 active:scale-[0.98]"
        >
          {SPMB.isOpen ? "Cek syarat pendaftaran" : "Buka galeri"}
        </Link>
      </section>
    </MobileShell>
  );
}
