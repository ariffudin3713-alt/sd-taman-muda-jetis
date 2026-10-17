import type { Metadata } from "next";
import Link from "next/link";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileHero, MobileSectionHeading } from "@/components/mobile/mobile-ui";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/icons";
import { mobilePageMetadata } from "@/lib/mobile-meta";
import { PPDB, SCHOOL, SCHOOL_HOURS, SCHOOL_MAPS } from "@/lib/school";

export const metadata: Metadata = mobilePageMetadata({
  title: "Kontak",
  description:
    "Alamat, telepon, email, dan peta lokasi SD Taman Muda Jetis di Jetis, Yogyakarta.",
  path: "/kontak",
});

export default function MobileKontakPage() {
  const addressText = SCHOOL.addressLines.join(", ");

  const actions = [
    {
      href: SCHOOL.phoneHref,
      label: "Telepon",
      detail: SCHOOL.phone,
      icon: <PhoneIcon className="h-5 w-5" />,
      tone: "bg-primary-700 text-white",
      external: false,
    },
    {
      href: `mailto:${SCHOOL.email}`,
      label: "Email",
      detail: SCHOOL.email,
      icon: <MailIcon className="h-5 w-5" />,
      tone: "bg-white text-primary-800 border border-primary-100",
      external: false,
    },
    {
      href: SCHOOL_MAPS.link,
      label: "Peta lokasi",
      detail: "Buka di Google Maps",
      icon: <MapPinIcon className="h-5 w-5" />,
      tone: "bg-white text-primary-800 border border-primary-100",
      external: true,
    },
    {
      href: SCHOOL.instagramUrl,
      label: "Instagram",
      detail: SCHOOL.instagram,
      icon: <InstagramIcon className="h-5 w-5" />,
      tone: "bg-white text-primary-800 border border-primary-100",
      external: true,
    },
  ];

  return (
    <MobileShell active="kontak">
      <MobileHero
        eyebrow="Hubungi kami"
        title="Kontak"
        description="Punya pertanyaan seputar sekolah atau pendaftaran? Hubungi kami atau kunjungi langsung."
      />

      {/* ---------------- Aksi cepat ---------------- */}
      <section className="px-4 py-5">
        <div className="space-y-2.5">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              {...(action.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`flex items-center gap-3.5 rounded-2xl p-4 shadow-card active:scale-[0.99] ${action.tone}`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  action.tone.includes("border") ? "bg-primary-50" : "bg-white/15"
                }`}
              >
                {action.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm font-bold">{action.label}</span>
                <span
                  className={`mt-0.5 block truncate text-xs ${
                    action.tone.includes("border") ? "text-ink-soft" : "text-primary-100"
                  }`}
                >
                  {action.detail}
                </span>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- Alamat & peta ---------------- */}
      <section className="px-4 pb-6">
        <MobileSectionHeading eyebrow="Lokasi" title="Kunjungi sekolah" />
        <div className="overflow-hidden rounded-3xl border border-primary-100">
          <iframe
            src={SCHOOL_MAPS.embed}
            title={`Lokasi ${SCHOOL.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full"
          />
        </div>
        <p className="mt-3 flex items-start gap-2 rounded-2xl border border-primary-100 bg-white p-4 text-sm leading-relaxed text-ink-soft">
          <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
          {addressText}
        </p>
      </section>

      {/* ---------------- Jam layanan ---------------- */}
      <section className="px-4 pb-6">
        <MobileSectionHeading eyebrow="Jam layanan" title="Jam sekolah" />
        <dl className="space-y-2.5">
          {SCHOOL_HOURS.map((row) => (
            <div
              key={row.day}
              className="flex items-center justify-between gap-3 rounded-2xl border border-primary-100 bg-white px-4 py-3.5"
            >
              <dt className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                <ClockIcon className="h-4 w-4 shrink-0 text-primary-600" />
                {row.day}
              </dt>
              <dd className="text-sm font-semibold text-primary-900">{row.time}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 rounded-2xl border border-primary-100 bg-primary-50 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary-900">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            NPSN {SCHOOL.npsn}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{PPDB.contactNote}</p>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      {PPDB.isOpen && (
        <section className="mx-4 mb-6 rounded-3xl bg-gradient-to-br from-primary-800 to-primary-700 p-5 text-center">
          <h2 className="font-display text-lg font-bold text-white">Tertarik mendaftar?</h2>
          <p className="mt-2 text-sm leading-relaxed text-primary-100">
            Lihat alur, syarat, dan jadwal pendaftaran siswa baru.
          </p>
          <Link
            href="/ppdb"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent-400 px-4 py-3 text-sm font-semibold text-primary-950 active:scale-[0.98]"
          >
            Cek syarat pendaftaran
          </Link>
        </section>
      )}
    </MobileShell>
  );
}
