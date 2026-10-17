import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileSectionHeading } from "@/components/mobile/mobile-ui";
import { CopyLinkButton } from "@/components/copy-link-button";
import { ArrowLeftIcon, ClockIcon } from "@/components/icons";
import { findBerita, getBerita, relatedBerita } from "@/lib/berita";
import { mobilePageMetadata } from "@/lib/mobile-meta";
import { SCHOOL, SITE_URL } from "@/lib/school";

/** Data di-refresh tiap jam, sama seperti versi desktop. */
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { items } = await getBerita();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { items } = await getBerita();
  const item = findBerita(items, slug);

  if (!item) return { title: "Berita tidak ditemukan" };

  return mobilePageMetadata({
    title: item.title,
    description: item.excerpt ?? item.title,
    path: `/berita/${item.slug}`,
  });
}

export default async function MobileBeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { items, error } = await getBerita();
  const item = findBerita(items, slug);

  if (!item) notFound();

  const related = relatedBerita(items, item, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.excerpt ?? item.title,
    image: item.mediaUrl ? [item.mediaUrl] : undefined,
    datePublished: item.dateIso,
    dateModified: item.dateIso,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/berita/${item.slug}` },
    publisher: {
      "@type": "EducationalOrganization",
      name: SCHOOL.name,
      telephone: SCHOOL.phone,
      email: SCHOOL.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SCHOOL.addressLines.join(", "),
        addressLocality: "Yogyakarta",
        addressCountry: "ID",
      },
    },
  };

  return (
    <MobileShell active="berita">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        {/* ---------------- Media penuh ---------------- */}
        {item.mediaUrl && (
          <div className="relative bg-primary-950">
            {item.isVideo && item.videoUrl ? (
              <video
                controls
                playsInline
                poster={item.mediaUrl}
                className="max-h-[60vh] w-full bg-primary-950 object-contain"
              >
                <source src={item.videoUrl} />
                Browser Anda tidak mendukung pemutaran video.
              </video>
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="max-h-[60vh] w-full object-cover"
              />
            )}

            <Link
              href="/berita"
              className="absolute left-3 top-3 flex h-9 items-center gap-1.5 rounded-full bg-black/55 px-3 text-xs font-semibold text-white backdrop-blur-sm"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Berita
            </Link>
          </div>
        )}

        {/* ---------------- Judul ---------------- */}
        <header className="border-b border-primary-100 bg-white px-4 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${item.categoryTone}`}>
              {item.category}
            </span>
            {item.dateLabel && (
              <time dateTime={item.dateIso} className="flex items-center gap-1 text-xs text-ink-soft">
                <ClockIcon className="h-3.5 w-3.5" />
                {item.dateLabel}
              </time>
            )}
          </div>

          <h1 className="mt-3 font-display text-xl font-extrabold leading-snug tracking-tight text-primary-900 text-balance">
            {item.title}
          </h1>

          {item.hasEngagement && (
            <p className="mt-3 text-xs text-ink-soft">
              {item.likesLabel} suka &middot; {item.commentsLabel} komentar
            </p>
          )}
        </header>

        {/* ---------------- Isi ---------------- */}
        <div className="bg-white px-4 py-5">
          {item.body.length > 0 ? (
            <div className="space-y-4 text-sm leading-relaxed text-ink-soft">
              {item.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-ink-soft">
              Berita ini hanya memuat foto atau video. Selengkapnya ada di postingan asli.
            </p>
          )}

          {item.hashtags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {item.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {item.links.length > 0 && (
            <div className="mt-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-ink">
                Tautan terkait
              </h2>
              <ul className="mt-2 space-y-1.5">
                {item.links.map((link) => (
                  <li key={link} className="break-all">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-700 underline decoration-primary-300 underline-offset-2"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2.5 border-t border-primary-100 pt-5">
            {item.permalink && (
              <a
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                Lihat di Instagram
              </a>
            )}
            <CopyLinkButton />
            <Link href="/berita" className="btn-ghost w-full">
              <ArrowLeftIcon />
              Kembali ke berita
            </Link>
          </div>
        </div>

        {/* ---------------- Berita lainnya ---------------- */}
        {related.length > 0 && (
          <section className="bg-mist px-4 py-6">
            <MobileSectionHeading eyebrow="Baca juga" title="Berita lainnya" />
            <ul className="space-y-3">
              {related.map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/berita/${other.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-white p-3 active:bg-primary-50"
                  >
                    {other.mediaUrl && (
                      <span className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-earth-100">
                        <img src={other.mediaUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-wide text-primary-600">
                        {other.category}
                      </span>
                      <span className="mt-1 block line-clamp-2 text-sm font-semibold leading-snug text-primary-900">
                        {other.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {error && (
        <p className="px-4 pb-6 text-xs text-ink-soft">
          Catatan: sebagian data berita gagal dimuat ({error}).
        </p>
      )}
    </MobileShell>
  );
}
